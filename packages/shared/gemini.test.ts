import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@google/genai', () => {
  const generateContent = vi.fn();
  return {
    GoogleGenAI: vi.fn().mockImplementation(() => ({
      models: { generateContent },
    })),
  };
});

vi.mock('./sambanova.js', () => ({
  generateTextCompletionSambaNova: vi.fn().mockResolvedValue(' fallback'),
}));

vi.mock('./logger.js', () => ({
  logger: { info: vi.fn(), error: vi.fn(), warn: vi.fn(), debug: vi.fn() },
}));

describe('generateTextCompletion', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.GEMINI_API_KEY = '';
  });

  it('returns empty when gemini has no key and provider gemini', async () => {
    const { generateTextCompletion } = await import('./gemini.js');
    const result = await generateTextCompletion(
      'hello world text',
      'sentence',
      'casual',
      'gemini'
    );
    expect(result).toBe('');
  });
});
