import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import express, { type Express } from 'express';
import request from 'supertest';
import { registerRoutes, clearStatusCache } from './routes';

// Mock the gemini module so we don't hit real APIs
vi.mock('./gemini', () => ({
  generateTextCompletion: vi.fn(),
  testApiKey: vi.fn(),
  testSambaNovaApiKey: vi.fn(),
}));

vi.mock('@shared/logger', () => ({
  logger: {
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
    debug: vi.fn(),
  },
}));

import {
  generateTextCompletion,
  testApiKey,
  testSambaNovaApiKey,
} from './gemini';

describe('Express routes', () => {
  let app: Express;

  beforeEach(() => {
    vi.clearAllMocks();
    clearStatusCache();
    process.env.NODE_ENV = 'test';
    delete process.env.GEMINI_API_KEY;
    delete process.env.SAMBANOVA_API_KEY;
    app = express();
    app.use(express.json());
    app = registerRoutes(app);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    process.env.NODE_ENV = 'test';
    delete process.env.GEMINI_API_KEY;
    delete process.env.SAMBANOVA_API_KEY;
    delete process.env.DISABLE_GEMINI;
  });

  describe('GET /api/health', () => {
    it('returns 200 with status ok', async () => {
      const res = await request(app).get('/api/health');
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ status: 'ok' });
    });
  });

  describe('POST /api/complete', () => {
    it('returns suggestion for valid request', async () => {
      vi.mocked(generateTextCompletion).mockResolvedValue(' great idea');

      const res = await request(app).post('/api/complete').send({
        text: 'I think this is a really good idea',
        mode: 'sentence',
        style: 'casual',
        provider: 'auto',
        geminiModel: 'gemini-3.8-flash',
      });

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ suggestion: ' great idea' });
      expect(generateTextCompletion).toHaveBeenCalledWith(
        'I think this is a really good idea',
        'sentence',
        'casual',
        'auto',
        'gemini-3.8-flash'
      );
    });

    it('returns empty suggestion for short text without calling provider', async () => {
      const res = await request(app).post('/api/complete').send({
        text: 'Hi',
        mode: 'word',
        style: 'formal',
        provider: 'gemini',
      });

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ suggestion: '' });
      expect(generateTextCompletion).not.toHaveBeenCalled();
    });

    it('returns 500 with empty suggestion when provider throws', async () => {
      vi.mocked(generateTextCompletion).mockRejectedValue(new Error('boom'));

      const res = await request(app).post('/api/complete').send({
        text: 'This is a long enough test text',
        mode: 'sentence',
        style: 'casual',
        provider: 'auto',
      });

      expect(res.status).toBe(500);
      expect(res.body).toEqual({ suggestion: '' });
    });

    it('returns 500 with empty suggestion when schema validation fails', async () => {
      const res = await request(app).post('/api/complete').send({
        text: 'This is a long enough test text',
        mode: 'invalid',
        style: 'casual',
        provider: 'auto',
      });

      expect(res.status).toBe(500);
      expect(res.body).toEqual({ suggestion: '' });
    });
  });

  describe('GET /api/status', () => {
    it('returns ok in test environment', async () => {
      const res = await request(app).get('/api/status');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('ok');
    });

    it('returns provider status when keys are set in production', async () => {
      process.env.NODE_ENV = 'production';
      process.env.GEMINI_API_KEY = 'test-key';
      process.env.SAMBANOVA_API_KEY = 'test-key';
      vi.mocked(testApiKey).mockResolvedValue(true);
      vi.mocked(testSambaNovaApiKey).mockResolvedValue(false);

      const res = await request(app).get('/api/status');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('ok');
      expect(res.body.providers.gemini).toBe(true);
      expect(res.body.providers.sambanova).toBe(false);
    });

    it('returns error when no provider works in production', async () => {
      process.env.NODE_ENV = 'production';
      process.env.GEMINI_API_KEY = 'test-key';
      process.env.SAMBANOVA_API_KEY = 'test-key';
      vi.mocked(testApiKey).mockResolvedValue(false);
      vi.mocked(testSambaNovaApiKey).mockResolvedValue(false);

      const res = await request(app).get('/api/status');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('error');
    });

    it('returns 500 when status check throws', async () => {
      process.env.NODE_ENV = 'production';
      process.env.GEMINI_API_KEY = 'test-key';
      vi.mocked(testApiKey).mockRejectedValue(new Error('network down'));

      const res = await request(app).get('/api/status');
      expect(res.status).toBe(500);
      expect(res.body).toEqual({ status: 'error' });
    });
  });
});
