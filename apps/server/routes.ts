import type { Express } from 'express';
import rateLimit from 'express-rate-limit';

import {
  generateTextCompletion,
  testApiKey,
  testSambaNovaApiKey,
} from './gemini';
import { textCompletionRequestSchema } from '@shared/schema';
import { logger } from '@shared/logger';

const completeLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
});

export function registerRoutes(app: Express): Express {
  app.get('/api/status', async (req, res) => {
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
      logger.error('Status check failed', error);
      res.status(500).json({ status: 'error' });
    }
  });

  app.post('/api/complete', completeLimiter, async (req, res) => {
    try {
      const { text, mode, style, provider, geminiModel } =
        textCompletionRequestSchema.parse(req.body);

      if (!text || text.length < 10) {
        return res.json({ suggestion: '' });
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
      logger.error('API error', error);
      res.status(500).json({ suggestion: '' });
    }
  });

  return app;
}
