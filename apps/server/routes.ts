import type { Express } from 'express';

import {
  generateTextCompletion,
  testApiKey,
  testSambaNovaApiKey,
} from './gemini';
import { textCompletionRequestSchema } from '@shared/schema';
import { logger } from '../../packages/shared/logger.js';

export function registerRoutes(app: Express): Express {
  app.get('/api/status', async (req, res) => {
    try {
      const geminiWorking = await testApiKey();
      const sambaNovaWorking = await testSambaNovaApiKey();
      const isWorking =
        process.env.NODE_ENV === 'development'
          ? true
          : geminiWorking || sambaNovaWorking; // At least one provider should work
      logger.info(
        `Status check result - Gemini: ${geminiWorking}, SambaNova: ${sambaNovaWorking}`
      );
      res.json({
        status: isWorking ? 'ok' : 'error',
        providers: {
          gemini: geminiWorking,
          sambanova: sambaNovaWorking,
        },
      });
    } catch (error) {
      logger.error('Status check failed');
      res.status(500).json({ status: 'error' });
    }
  });

  app.post('/api/complete', async (req, res) => {
    try {
      const {
        text,
        mode,
        style,
        provider,
        geminiApiKey,
        sambaNovaApiKey,
        geminiModel,
      } = textCompletionRequestSchema.parse(req.body);

      if (!text || text.length < 10) {
        return res.json({ suggestion: '' });
      }

      const suggestion = await generateTextCompletion(
        text,
        mode,
        style,
        provider,
        geminiApiKey,
        sambaNovaApiKey,
        geminiModel
      );
      res.json({ suggestion });
    } catch (error) {
      logger.error('API error');
      res.status(500).json({ suggestion: '' });
    }
  });

  return app;
}
