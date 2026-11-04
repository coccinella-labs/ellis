import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../packages/shared/gemini.js', () => ({
  ai: { models: { generateContent: vi.fn() } },
  generateTextCompletion: vi.fn(),
}));

vi.mock('../../packages/shared/sambanova.js', () => ({
  generateTextCompletionSambaNova: vi.fn(),
}));

vi.mock('../../packages/shared/openrouter.js', () => ({
  generateTextCompletionOpenRouter: vi.fn(),
}));

vi.mock('../../packages/shared/atlascloud.js', () => ({
  generateTextCompletionAtlasCloud: vi.fn(),
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

  it('testAtlasCloudApiKey returns false without key', async () => {
    delete process.env.ATLASCLOUD_API_KEY;
    const { testAtlasCloudApiKey } = await import('./gemini.js');
    expect(await testAtlasCloudApiKey()).toBe(false);
  });

  it('testAtlasCloudApiKey returns true when key works', async () => {
    process.env.ATLASCLOUD_API_KEY = 'test';
    const atlascloud = await import('../../packages/shared/atlascloud.js');
    vi.mocked(
      atlascloud.generateTextCompletionAtlasCloud
    ).mockResolvedValueOnce(' ok');
    const { testAtlasCloudApiKey } = await import('./gemini.js');
    expect(await testAtlasCloudApiKey()).toBe(true);
  });
});

describe('server gemini failure branches', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns false when Gemini test throws', async () => {
    process.env.GEMINI_API_KEY = 'test';
    const gemini = await import('@shared/gemini.js');
    vi.mocked(gemini.ai.models.generateContent).mockRejectedValueOnce(
      new Error('fail')
    );
    const { testApiKey } = await import('./gemini.js');
    expect(await testApiKey()).toBe(false);
  });

  it('returns false when SambaNova test throws', async () => {
    process.env.SAMBANOVA_API_KEY = 'test';
    const sambanova = await import('@shared/sambanova.js');
    vi.mocked(sambanova.generateTextCompletionSambaNova).mockRejectedValueOnce(
      new Error('fail')
    );
    const { testSambaNovaApiKey } = await import('./gemini.js');
    expect(await testSambaNovaApiKey()).toBe(false);
  });

  it('returns false when AtlasCloud test throws', async () => {
    process.env.ATLASCLOUD_API_KEY = 'test';
    const atlascloud = await import('@shared/atlascloud.js');
    vi.mocked(
      atlascloud.generateTextCompletionAtlasCloud
    ).mockRejectedValueOnce(new Error('fail'));
    const { testAtlasCloudApiKey } = await import('./gemini.js');
    expect(await testAtlasCloudApiKey()).toBe(false);
  });
});
