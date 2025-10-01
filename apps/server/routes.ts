import type { Express } from 'express';
import { createServer, type Server } from 'http';
import { storage } from './storage';
import { generateTextCompletion } from './gemini';
import { textCompletionRequestSchema } from '@shared/schema';

export function registerRoutes(app: Express): Express {
  app.post('/api/complete', async (req, res) => {
    try {
      const { text, mode, style } = textCompletionRequestSchema.parse(req.body);

      if (!text || text.length < 10) {
        return res.json({ suggestion: '' });
      }

      const suggestion = await generateTextCompletion(text, mode, style);
      res.json({ suggestion });
    } catch (error) {
      console.error('API error:', error);
      res.status(500).json({ suggestion: '' });
    }
  });

  return app;
}
