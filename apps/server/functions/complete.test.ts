import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../gemini', () => ({
  generateTextCompletion: vi.fn().mockResolvedValue(' suggestion'),
  testApiKey: vi.fn(),
  testSambaNovaApiKey: vi.fn(),
  testOpenRouterApiKey: vi.fn(),
}));

vi.mock('../../../packages/shared/schema', () => ({
  textCompletionRequestSchema: {
    parse: vi.fn((body: any) => body),
  },
}));

vi.mock('../../../packages/shared/logger', () => ({
  logger: { info: vi.fn(), error: vi.fn(), warn: vi.fn(), debug: vi.fn() },
}));

describe('complete handler', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 405 for non-POST', async () => {
    const { default: handler } = await import('./complete');
    const res: any = { status: vi.fn().mockReturnThis(), json: vi.fn() };
    await handler({ method: 'GET', headers: {}, socket: {} }, res);
    expect(res.status).toHaveBeenCalledWith(405);
  });

  it('returns empty suggestion for short text', async () => {
    const { default: handler } = await import('./complete');
    const schema = await import('../../../packages/shared/schema');
    vi.mocked(schema.textCompletionRequestSchema.parse).mockReturnValue({
      text: 'Hi',
      mode: 'sentence',
      style: 'casual',
      provider: 'auto',
      geminiModel: 'gemini-3.8-flash',
    });
    const res: any = { status: vi.fn().mockReturnThis(), json: vi.fn() };
    await handler(
      { method: 'POST', headers: {}, socket: {}, body: { text: 'Hi' } },
      res
    );
    expect(res.json).toHaveBeenCalledWith({ suggestion: '' });
  });

  it('returns suggestion for valid text', async () => {
    const { default: handler } = await import('./complete');
    const schema = await import('../../../packages/shared/schema');
    vi.mocked(schema.textCompletionRequestSchema.parse).mockReturnValue({
      text: 'Hello world text',
      mode: 'sentence',
      style: 'casual',
      provider: 'auto',
      geminiModel: 'gemini-3.8-flash',
    });
    const res: any = { status: vi.fn().mockReturnThis(), json: vi.fn() };
    await handler(
      {
        method: 'POST',
        headers: {},
        socket: {},
        body: { text: 'Hello world text' },
      },
      res
    );
    expect(res.json).toHaveBeenCalledWith({ suggestion: ' suggestion' });
  });

  it('returns 400 for ZodError', async () => {
    const { default: handler } = await import('./complete');
    const schema = await import('../../../packages/shared/schema');
    const zodError = new Error('validation');
    zodError.name = 'ZodError';
    vi.mocked(schema.textCompletionRequestSchema.parse).mockImplementation(
      () => {
        throw zodError;
      }
    );
    const res: any = { status: vi.fn().mockReturnThis(), json: vi.fn() };
    await handler({ method: 'POST', headers: {}, socket: {}, body: {} }, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });
});
