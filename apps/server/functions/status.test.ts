import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../gemini', () => ({
  testApiKey: vi.fn().mockResolvedValue(true),
  testSambaNovaApiKey: vi.fn().mockResolvedValue(true),
  testOpenRouterApiKey: vi.fn().mockResolvedValue(true),
  generateTextCompletion: vi.fn(),
}));

vi.mock('../../../packages/shared/logger', () => ({
  logger: { info: vi.fn(), error: vi.fn(), warn: vi.fn(), debug: vi.fn() },
}));

describe('status handler', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    delete process.env.GEMINI_API_KEY;
    delete process.env.SAMBANOVA_API_KEY;
    delete process.env.OPENROUTER_API_KEY;
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
    delete process.env.NODE_ENV;
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
    delete process.env.NODE_ENV;
  });
});
