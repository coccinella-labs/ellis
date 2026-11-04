import {
  testApiKey,
  testSambaNovaApiKey,
  testOpenRouterApiKey,
} from '../gemini';

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

  try {
    const hasGeminiKey = !!process.env.GEMINI_API_KEY;
    const hasSambaNovaKey = !!process.env.SAMBANOVA_API_KEY;
    const hasOpenRouterKey = !!process.env.OPENROUTER_API_KEY;

    let geminiWorking = false;
    let sambaNovaWorking = false;
    let openRouterWorking = false;

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

    const isWorking =
      process.env.NODE_ENV === 'development'
        ? true
        : geminiWorking || sambaNovaWorking || openRouterWorking;

    res.json({
      status: isWorking ? 'ok' : 'error',
      providers: {
        gemini: geminiWorking,
        sambanova: sambaNovaWorking,
        openrouter: openRouterWorking,
      },
    });
  } catch (error) {
    console.error('Status check error:', error);
    res.status(500).json({ status: 'error' });
  }
}
