import { generateTextCompletion } from '../gemini';
import { textCompletionRequestSchema } from '../../../packages/shared/schema';

// Rate limit: 30 requests per 60-second window per IP.
// Uses Upstash Redis when UPSTASH_REDIS_URL is configured, which works across
// Vercel serverless instances. Falls back to an in-memory store for local
// development where Redis is not available.
let ratelimit: any = null;
let fallbackStore: Map<string, { count: number; resetAt: number }> | null =
  null;

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 30;

async function getRatelimit() {
  if (ratelimit) return ratelimit;

  const redisUrl = process.env.UPSTASH_REDIS_URL;
  if (redisUrl) {
    try {
      const { Ratelimit } = await import('@upstash/ratelimit');
      const { Redis } = await import('@upstash/redis');
      // Redis.fromEnv() reads UPSTASH_REDIS_REST_URL and
      // UPSTASH_REDIS_REST_TOKEN from the environment.
      const redis = new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL || redisUrl,
        token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
      });
      ratelimit = new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(MAX_REQUESTS, `${WINDOW_MS} ms`),
        analytics: false,
      });
      return ratelimit;
    } catch (error) {
      console.error(
        'Failed to initialize Upstash ratelimit, using in-memory fallback:',
        error
      );
    }
  }

  // In-memory fallback for local development.
  fallbackStore = new Map();
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

export default async function handler(req: any, res: any) {
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
      res.json({ suggestion: '' });
      return;
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
    console.error('API error:', error);
    res.status(500).json({ suggestion: '' });
  }
}
