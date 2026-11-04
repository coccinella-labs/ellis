import { generateTextCompletion } from '../gemini';
import { textCompletionRequestSchema } from '../../../packages/shared/schema';

// Rate limit: 30 requests per 60-second window per IP.
// Uses Upstash Redis when UPSTASH_REDIS_REST_URL and
// UPSTASH_REDIS_REST_TOKEN are configured, which works across Vercel
// serverless instances. Falls back to an in-memory store for local
// development where Redis is not available.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let ratelimit: any = null;
// In-memory fallback store. Initialized once at module load so the
// counter persists across calls within the same process; a fresh Map
// would reset the limit on every request.
let fallbackStore: Map<string, { count: number; resetAt: number }> = new Map();

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 30;

async function getRatelimit() {
  if (ratelimit) return ratelimit;

  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (redisUrl && redisToken) {
    try {
      const { Ratelimit } = await import('@upstash/ratelimit');
      const { Redis } = await import('@upstash/redis');
      const redis = new Redis({ url: redisUrl, token: redisToken });
      ratelimit = new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(MAX_REQUESTS, `${WINDOW_MS} ms`),
        analytics: false,
      });
      return ratelimit;
    } catch {
      console.error(
        'Failed to initialize Upstash ratelimit, using in-memory fallback'
      );
    }
  }

  // In-memory fallback for local development. The store is created once at
  // module load so the counter persists across calls.
  return null;
}

function isRateLimitedFallback(ip: string): boolean {
  if (!fallbackStore) return false;
  const now = Date.now();
  const entry = fallbackStore.get(ip);
  if (!entry || now > entry.resetAt) {
    fallbackStore.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_REQUESTS;
}

export default async function handler(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  req: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  res: any
) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const ip =
    req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown';

  const limiter = await getRatelimit();
  if (limiter) {
    const { success } = await limiter.limit(ip);
    if (!success) {
      res.status(429).json({ error: 'Too many requests' });
      return;
    }
  } else if (isRateLimitedFallback(ip)) {
    res.status(429).json({ error: 'Too many requests' });
    return;
  }

  try {
    const { text, mode, style, provider, geminiModel } =
      textCompletionRequestSchema.parse(req.body);

    if (!text || text.length < 10) {
      return res.json({ suggestion: '' });
    }

    const suggestion = await generateTextCompletion(
      text,
      mode,
      style,
      provider,
      geminiModel
    );
    res.json({ suggestion });
  } catch (error) {
    // Zod validation failures are client errors, not server errors.
    if (error instanceof Error && error.name === 'ZodError') {
      return res.status(400).json({ suggestion: '' });
    }
    console.error('API error');
    res.status(500).json({ suggestion: '' });
  }
}
