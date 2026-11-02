import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../packages/shared/gemini.js', () => ({
  ai: { models: { generateContent: vi.fn() } },
  generateTextCompletion: vi.fn(),
}));

vi.mock('../../packages/shared/sambanova.js', () => ({
  generateTextCompletionSambaNova: vi.fn(),
}));

vi.mock('../../packages/shared/logger.js', () => ({
  logger: { info: vi.fn(), error: vi.fn(), warn: vi.fn(), debug: vi.fn() },
}));

describe('server gemini wrappers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('testApiKey returns false without key', async () => {
    delete process.env.GEMINI_API_KEY;
    const { testApiKey } = await import('./gemini.js');
    expect(await testApiKey()).toBe(false);
  });

  it('testApiKey returns true when key works', async () => {
    process.env.GEMINI_API_KEY = 'test';
    const gemini = await import('../../packages/shared/gemini.js');
    vi.mocked(gemini.ai.models.generateContent).mockResolvedValueOnce({
      text: 'ok',
    } as any);
    const { testApiKey } = await import('./gemini.js');
    expect(await testApiKey()).toBe(true);
  });

  it('testSambaNovaApiKey returns false without key', async () => {
    delete process.env.SAMBANOVA_API_KEY;
    const { testSambaNovaApiKey } = await import('./gemini.js');
    expect(await testSambaNovaApiKey()).toBe(false);
  });

  it('testSambaNovaApiKey returns true when key works', async () => {
    process.env.SAMBANOVA_API_KEY = 'test';
    const sambanova = await import('../../packages/shared/sambanova.js');
    vi.mocked(sambanova.generateTextCompletionSambaNova).mockResolvedValueOnce(
      ' ok'
    );
    const { testSambaNovaApiKey } = await import('./gemini.js');
    expect(await testSambaNovaApiKey()).toBe(true);
  });
});
