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
      const hasGeminiKey = !!process.env.GEMINI_API_KEY;
      const hasSambaNovaKey = !!process.env.SAMBANOVA_API_KEY;

      let geminiWorking = false;
      let sambaNovaWorking = false;

      // Skip Gemini test if DISABLE_GEMINI is set or if quota is exceeded
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
    } catch {
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
    } catch {
      logger.error('API error');
      res.status(500).json({ suggestion: '' });
    }
  });

  return app;
}
