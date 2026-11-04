import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

vi.mock('../gemini', () => ({
  testApiKey: vi.fn().mockResolvedValue(true),
  testSambaNovaApiKey: vi.fn().mockResolvedValue(true),
  testOpenRouterApiKey: vi.fn().mockResolvedValue(true),
  testAtlasCloudApiKey: vi.fn().mockResolvedValue(true),
  generateTextCompletion: vi.fn(),
}));

vi.mock('../../../packages/shared/logger', () => ({
  logger: { info: vi.fn(), error: vi.fn(), warn: vi.fn(), debug: vi.fn() },
}));

import { clearStatusCache } from './status';

describe('status handler', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    clearStatusCache();
    delete process.env.GEMINI_API_KEY;
    delete process.env.SAMBANOVA_API_KEY;
    delete process.env.OPENROUTER_API_KEY;
    delete process.env.ATLASCLOUD_API_KEY;
    delete process.env.DISABLE_GEMINI;
  });

  afterEach(() => {
    process.env.NODE_ENV = 'test';
    clearStatusCache();
  });

  it('returns 405 for non-GET', async () => {
    const { default: handler } = await import('./status');
    const res: any = { status: vi.fn().mockReturnThis(), json: vi.fn() };
    await handler({ method: 'POST' }, res);
    expect(res.status).toHaveBeenCalledWith(405);
  });

  it('returns ok in development', async () => {
    process.env.NODE_ENV = 'development';
    const { default: handler } = await import('./status');
    const res: any = { status: vi.fn().mockReturnThis(), json: vi.fn() };
    await handler({ method: 'GET' }, res);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ status: 'ok' })
    );
  });

  it('returns error when no providers work in production', async () => {
    process.env.NODE_ENV = 'production';
    const gemini = await import('../gemini');
    vi.mocked(gemini.testApiKey).mockResolvedValue(false);
    vi.mocked(gemini.testSambaNovaApiKey).mockResolvedValue(false);
    vi.mocked(gemini.testOpenRouterApiKey).mockResolvedValue(false);
    const { default: handler } = await import('./status');
    const res: any = { status: vi.fn().mockReturnThis(), json: vi.fn() };
    await handler({ method: 'GET' }, res);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ status: 'error' })
    );
  });

  it('probes AtlasCloud and caches consecutive status requests', async () => {
    process.env.NODE_ENV = 'production';
    process.env.ATLASCLOUD_API_KEY = 'test-key';
    const gemini = await import('../gemini');
    vi.mocked(gemini.testAtlasCloudApiKey).mockResolvedValue(true);
    const { default: handler } = await import('./status');

    const res: any = { status: vi.fn().mockReturnThis(), json: vi.fn() };
    await handler({ method: 'GET' }, res);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'ok',
        providers: expect.objectContaining({ atlascloud: true }),
      })
    );
    expect(gemini.testAtlasCloudApiKey).toHaveBeenCalledTimes(1);

    const cachedRes: any = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    await handler({ method: 'GET' }, cachedRes);
    expect(cachedRes.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'ok',
        providers: expect.objectContaining({ atlascloud: true }),
      })
    );
    expect(gemini.testAtlasCloudApiKey).toHaveBeenCalledTimes(1);
  });

  it('returns 500 when a probe throws', async () => {
    process.env.NODE_ENV = 'production';
    process.env.ATLASCLOUD_API_KEY = 'test-key';
    const gemini = await import('../gemini');
    vi.mocked(gemini.testAtlasCloudApiKey).mockRejectedValue(new Error('boom'));
    const { default: handler } = await import('./status');
    const res: any = { status: vi.fn().mockReturnThis(), json: vi.fn() };
    await handler({ method: 'GET' }, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ status: 'error' });
  });
});
