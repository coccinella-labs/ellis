import { generateTextCompletion } from '../apps/server/gemini.js';
import { textCompletionRequestSchema } from '../packages/shared/schema.js';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { text, mode, style } = textCompletionRequestSchema.parse(req.body);

    if (!text || text.length < 10) {
      res.json({ suggestion: '' });
      return;
    }

    const suggestion = await generateTextCompletion(text, mode, style);
    res.json({ suggestion });
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ suggestion: '' });
  }
}
