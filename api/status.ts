import { testApiKey, testSambaNovaApiKey } from '../apps/server/gemini.ts';

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const hasGeminiKey = !!process.env.GEMINI_API_KEY;
    const hasSambaNovaKey = !!process.env.SAMBANOVA_API_KEY;

    let geminiWorking = false;
    let sambaNovaWorking = false;

    const skipGemini = process.env.DISABLE_GEMINI === 'true';
    if (hasGeminiKey && !skipGemini) {
      geminiWorking = await testApiKey();
    }
    if (hasSambaNovaKey) {
      sambaNovaWorking = await testSambaNovaApiKey();
    }

    const isWorking =
      process.env.NODE_ENV === 'development'
        ? true
        : geminiWorking || sambaNovaWorking;

    res.json({
      status: isWorking ? 'ok' : 'error',
      providers: {
        gemini: geminiWorking,
        sambanova: sambaNovaWorking,
      },
    });
  } catch (error) {
    console.error('Status check error:', error);
    res.status(500).json({ status: 'error' });
  }
}
