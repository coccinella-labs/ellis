import { describe, it, expect, vi } from 'vitest';

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
  it('testApiKey returns false without key', async () => {
    delete process.env.GEMINI_API_KEY;
    const { testApiKey } = await import('./gemini.js');
    expect(await testApiKey()).toBe(false);
  });

  it('testSambaNovaApiKey returns false without key', async () => {
    delete process.env.SAMBANOVA_API_KEY;
    const { testSambaNovaApiKey } = await import('./gemini.js');
    expect(await testSambaNovaApiKey()).toBe(false);
  });
});
