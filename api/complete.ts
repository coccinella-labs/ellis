import { generateTextCompletion } from '../apps/server/gemini.ts';
import { textCompletionRequestSchema } from '../packages/shared/schema.ts';

// In-memory rate limit: 30 requests per 60-second window per IP.
const requestCounts = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 30;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = requestCounts.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  requestCounts.set(ip, recent);
  return recent.length > MAX_REQUESTS;
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

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
    console.error('API error:', error);
    res.status(500).json({ suggestion: '' });
  }
}
