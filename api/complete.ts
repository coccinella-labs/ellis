import { generateTextCompletion } from '../apps/server/gemini.ts';
import { textCompletionRequestSchema } from '../packages/shared/schema.ts';

// Rate limit: 30 requests per 60-second window per IP.
// This is a best-effort in-memory store. Vercel serverless instances do not
// share state, so this is not reliable across deployments. For production,
// replace this with a shared store such as Redis via @upstash/ratelimit.
const requestCounts = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 30;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = requestCounts.get(ip);

  if (!entry || now > entry.resetAt) {
    requestCounts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_REQUESTS;
}

// Remove expired entries to prevent the Map from growing unboundedly.
function cleanupExpiredEntries(): void {
  const now = Date.now();
  for (const [ip, entry] of requestCounts.entries()) {
    if (now > entry.resetAt) {
      requestCounts.delete(ip);
    }
  }
}

// Run cleanup periodically (every 60 seconds) to bound memory usage.
let cleanupStarted = false;
function startCleanup(): void {
  if (cleanupStarted) return;
  cleanupStarted = true;
  setInterval(cleanupExpiredEntries, WINDOW_MS).unref?.();
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  startCleanup();

  const ip =
    req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown';
  if (isRateLimited(ip)) {
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
