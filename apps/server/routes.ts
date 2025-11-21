import type { Express } from 'express';
import { createServer, type Server } from 'http';

import {
  generateTextCompletion,
  testApiKey,
  testSambaNovaApiKey,
} from './gemini';
import { textCompletionRequestSchema } from '@shared/schema';

export function registerRoutes(app: Express): Express {
  app.get('/api/status', async (req, res) => {
    try {
      const geminiWorking = await testApiKey();
      const sambaNovaWorking = await testSambaNovaApiKey();
      const isWorking = geminiWorking || sambaNovaWorking; // At least one provider should work
      console.log(
        'Status check result - Gemini:',
        geminiWorking,
        'SambaNova:',
        sambaNovaWorking
      );
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
  });

  app.post('/api/complete', async (req, res) => {
    try {
      const { text, mode, style, provider, geminiApiKey, sambaNovaApiKey } =
        textCompletionRequestSchema.parse(req.body);

      if (!text || text.length < 10) {
        return res.json({ suggestion: '' });
      }

      const suggestion = await generateTextCompletion(
        text,
        mode,
        style,
        provider,
        geminiApiKey,
        sambaNovaApiKey
      );
      res.json({ suggestion });
    } catch (error) {
      console.error('API error:', error);
      res.status(500).json({ suggestion: '' });
    }
  });

  return app;
}
