import {
  testApiKey,
  testSambaNovaApiKey,
  testOpenRouterApiKey,
  testAtlasCloudApiKey,
} from '../gemini';

// Provider probes issue a minimal completion request because none of the
// providers expose an authenticated lightweight key-check endpoint.
// Cache the result so repeated status requests do not consume extra quota.
const STATUS_CACHE_TTL_MS = 60_000;

let statusCache: { data: unknown; expires: number } | null = null;

export function clearStatusCache(): void {
  statusCache = null;
}

export default async function handler(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  req: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  res: any
) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  if (statusCache && statusCache.expires > Date.now()) {
    res.json(statusCache.data);
    return;
  }

  try {
    const hasGeminiKey = !!process.env.GEMINI_API_KEY;
    const hasSambaNovaKey = !!process.env.SAMBANOVA_API_KEY;
    const hasOpenRouterKey = !!process.env.OPENROUTER_API_KEY;
    const hasAtlasCloudKey = !!process.env.ATLASCLOUD_API_KEY;

    let geminiWorking = false;
    let sambaNovaWorking = false;
    let openRouterWorking = false;
    let atlasCloudWorking = false;

    const skipGemini = process.env.DISABLE_GEMINI === 'true';
    if (hasGeminiKey && !skipGemini) {
      geminiWorking = await testApiKey();
    }
    if (hasSambaNovaKey) {
      sambaNovaWorking = await testSambaNovaApiKey();
    }
    if (hasOpenRouterKey) {
      openRouterWorking = await testOpenRouterApiKey();
    }
    if (hasAtlasCloudKey) {
      atlasCloudWorking = await testAtlasCloudApiKey();
    }

    const isWorking =
      process.env.NODE_ENV === 'development'
        ? true
        : geminiWorking ||
          sambaNovaWorking ||
          openRouterWorking ||
          atlasCloudWorking;

    const payload = {
      status: isWorking ? 'ok' : 'error',
      providers: {
        gemini: geminiWorking,
        sambanova: sambaNovaWorking,
        openrouter: openRouterWorking,
        atlascloud: atlasCloudWorking,
      },
    };

    statusCache = { data: payload, expires: Date.now() + STATUS_CACHE_TTL_MS };
    res.json(payload);
  } catch {
    console.error('Status check error');
    res.status(500).json({ status: 'error' });
  }
}
