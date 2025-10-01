import { testApiKey } from '../apps/server/gemini.js';

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const isWorking = await testApiKey();
    console.log('Status check result:', isWorking);
    res.json({ status: isWorking ? 'ok' : 'error' });
  } catch (error) {
    console.error('Status check error:', error);
    res.status(500).json({ status: 'error' });
  }
}
