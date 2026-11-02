import { describe, it, expect, vi, beforeEach } from 'vitest';

const generateContent = vi.fn();

vi.mock('@google/genai', () => ({
  GoogleGenAI: vi.fn().mockImplementation(() => ({
    models: { generateContent },
  })),
}));

vi.mock('./sambanova.js', () => ({
  generateTextCompletionSambaNova: vi.fn().mockResolvedValue(' fallback'),
}));

vi.mock('./logger.js', () => ({
  logger: { info: vi.fn(), error: vi.fn(), warn: vi.fn(), debug: vi.fn() },
}));

vi.mock('./prompts.js', () => ({
  buildSystemPrompt: vi.fn().mockReturnValue('prompt'),
}));

describe('generateTextCompletion', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.GEMINI_API_KEY = 'test-key';
  });

  it('returns empty without key for gemini provider', async () => {
    process.env.GEMINI_API_KEY = '';
    const { generateTextCompletion } = await import('./gemini.js');
    expect(
      await generateTextCompletion(
        'hello world text',
        'sentence',
        'casual',
        'gemini'
      )
    ).toBe('');
  });

  it('returns suggestion for gemini provider', async () => {
    generateContent.mockResolvedValueOnce({ text: 'hello' });
    const { generateTextCompletion } = await import('./gemini.js');
    const result = await generateTextCompletion(
      'hello world text',
      'sentence',
      'casual',
      'gemini'
    );
    expect(result).toBe(' hello');
  });

  it('returns empty for gemini provider with no suggestion', async () => {
    generateContent.mockResolvedValueOnce({ text: '' });
    const { generateTextCompletion } = await import('./gemini.js');
    expect(
      await generateTextCompletion(
        'hello world text',
        'sentence',
        'casual',
        'gemini'
      )
    ).toBe('');
  });

  it('falls back to sambanova in auto mode', async () => {
    const err = new Error('quota exceeded');
    (err as any).status = 429;
    generateContent.mockRejectedValueOnce(err);
    const { generateTextCompletion } = await import('./gemini.js');
    const result = await generateTextCompletion(
      'hello world text',
      'sentence',
      'casual',
      'auto'
    );
    expect(result).toBe(' fallback');
  });

  it('returns empty in auto mode when no key and no fallback', async () => {
    process.env.GEMINI_API_KEY = '';
    const sambanova = await import('./sambanova.js');
    vi.mocked(sambanova.generateTextCompletionSambaNova).mockResolvedValueOnce(
      ''
    );
    const { generateTextCompletion } = await import('./gemini.js');
    const result = await generateTextCompletion(
      'hello world text',
      'sentence',
      'casual',
      'auto'
    );
    expect(result).toBe('');
  });
});

describe('generateTextCompletion additional branches', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.GEMINI_API_KEY = 'test-key';
  });

  it('uses SambaNova directly without a Gemini key', async () => {
    process.env.GEMINI_API_KEY = '';
    const sambanova = await import('./sambanova.js');
    vi.mocked(sambanova.generateTextCompletionSambaNova).mockResolvedValueOnce(
      ' direct'
    );
    const { generateTextCompletion } = await import('./gemini.js');
    const result = await generateTextCompletion(
      'hello world text',
      'sentence',
      'casual',
      'auto'
    );
    expect(result).toBe(' direct');
  });

  it('returns word suggestion without a leading space', async () => {
    const { GoogleGenAI } = await import('@google/genai');
    const instance = new (GoogleGenAI as any)();
    instance.models.generateContent.mockResolvedValueOnce({ text: 'next' });
    const { generateTextCompletion } = await import('./gemini.js');
    const result = await generateTextCompletion(
      'hello',
      'word',
      'casual',
      'gemini'
    );
    expect(result).toBe('next');
  });

  it('returns empty for a non-rate-limit Gemini failure', async () => {
    const { GoogleGenAI } = await import('@google/genai');
    const instance = new (GoogleGenAI as any)();
    instance.models.generateContent.mockRejectedValueOnce(new Error('network'));
    const { generateTextCompletion } = await import('./gemini.js');
    const result = await generateTextCompletion(
      'hello world text',
      'sentence',
      'casual',
      'auto'
    );
    expect(result).toBe('');
  });
});

describe('shared gemini missed branches', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.GEMINI_API_KEY = 'test-key';
  });

  it('returns a spaced Gemini suggestion', async () => {
    const { GoogleGenAI } = await import('@google/genai');
    const instance = new (GoogleGenAI as any)();
    instance.models.generateContent.mockResolvedValueOnce({ text: ' hello' });
    const { generateTextCompletion } = await import('./gemini.js');
    const result = await generateTextCompletion(
      'hello world text',
      'sentence',
      'casual',
      'gemini'
    );
    expect(result).toBe(' hello');
  });

  it('returns an unspaced Gemini auto suggestion', async () => {
    const { GoogleGenAI } = await import('@google/genai');
    const instance = new (GoogleGenAI as any)();
    instance.models.generateContent.mockResolvedValueOnce({ text: 'hello' });
    const { generateTextCompletion } = await import('./gemini.js');
    const result = await generateTextCompletion(
      'hello world text',
      'sentence',
      'casual',
      'auto'
    );
    expect(result).toBe(' hello');
  });

  it('returns a spaced SambaNova direct suggestion', async () => {
    process.env.GEMINI_API_KEY = '';
    const sambanova = await import('./sambanova.js');
    vi.mocked(sambanova.generateTextCompletionSambaNova).mockResolvedValueOnce(
      ' direct'
    );
    const { generateTextCompletion } = await import('./gemini.js');
    const result = await generateTextCompletion(
      'hello world text',
      'sentence',
      'casual',
      'auto'
    );
    expect(result).toBe(' direct');
  });

  it('returns an unspaced SambaNova direct suggestion', async () => {
    process.env.GEMINI_API_KEY = '';
    const sambanova = await import('./sambanova.js');
    vi.mocked(sambanova.generateTextCompletionSambaNova).mockResolvedValueOnce(
      'direct'
    );
    const { generateTextCompletion } = await import('./gemini.js');
    const result = await generateTextCompletion(
      'hello world text',
      'sentence',
      'casual',
      'auto'
    );
    expect(result).toBe(' direct');
  });

  it('returns a paragraph suggestion in auto mode', async () => {
    const { GoogleGenAI } = await import('@google/genai');
    const instance = new (GoogleGenAI as any)();
    instance.models.generateContent.mockResolvedValueOnce({
      text: 'paragraph',
    });
    const { generateTextCompletion } = await import('./gemini.js');
    const result = await generateTextCompletion(
      'hello world text',
      'paragraph',
      'casual',
      'auto'
    );
    expect(result).toBe(' paragraph');
  });
});

describe('shared gemini branch coverage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.GEMINI_API_KEY = 'test-key';
  });

  it('returns a spaced Gemini suggestion', async () => {
    const { GoogleGenAI } = await import('@google/genai');
    const instance = new (GoogleGenAI as any)();
    instance.models.generateContent.mockResolvedValueOnce({ text: ' hello' });
    const { generateTextCompletion } = await import('./gemini.js');
    const result = await generateTextCompletion(
      'hello world text',
      'sentence',
      'casual',
      'gemini'
    );
    expect(result).toBe(' hello');
  });

  it('returns an unspaced Gemini auto suggestion', async () => {
    const { GoogleGenAI } = await import('@google/genai');
    const instance = new (GoogleGenAI as any)();
    instance.models.generateContent.mockResolvedValueOnce({ text: 'hello' });
    const { generateTextCompletion } = await import('./gemini.js');
    const result = await generateTextCompletion(
      'hello world text',
      'sentence',
      'casual',
      'auto'
    );
    expect(result).toBe(' hello');
  });

  it('returns a spaced SambaNova direct suggestion', async () => {
    process.env.GEMINI_API_KEY = '';
    const sambanova = await import('./sambanova.js');
    vi.mocked(sambanova.generateTextCompletionSambaNova).mockResolvedValueOnce(
      ' direct'
    );
    const { generateTextCompletion } = await import('./gemini.js');
    const result = await generateTextCompletion(
      'hello world text',
      'sentence',
      'casual',
      'auto'
    );
    expect(result).toBe(' direct');
  });
});

describe('shared gemini missed branches', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.GEMINI_API_KEY = 'test-key';
  });

  it('logs a SambaNova failure without a Gemini key', async () => {
    process.env.GEMINI_API_KEY = '';
    const sambanova = await import('./sambanova.js');
    vi.mocked(sambanova.generateTextCompletionSambaNova).mockRejectedValueOnce(
      new Error('fail')
    );
    const { generateTextCompletion } = await import('./gemini.js');
    const result = await generateTextCompletion(
      'hello world text',
      'sentence',
      'casual',
      'auto'
    );
    expect(result).toBe('');
  });

  it('returns a Gemini suggestion in auto mode', async () => {
    const { GoogleGenAI } = await import('@google/genai');
    const instance = new (GoogleGenAI as any)();
    instance.models.generateContent.mockResolvedValueOnce({ text: ' hello' });
    const { generateTextCompletion } = await import('./gemini.js');
    const result = await generateTextCompletion(
      'hello world text',
      'sentence',
      'casual',
      'auto'
    );
    expect(result).toBe(' hello');
  });
});

describe('shared gemini additional branches', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.GEMINI_API_KEY = 'test-key';
  });

  it('returns a SambaNova suggestion', async () => {
    const sambanova = await import('./sambanova.js');
    vi.mocked(sambanova.generateTextCompletionSambaNova).mockResolvedValueOnce(
      ' direct'
    );
    const { generateTextCompletion } = await import('./gemini.js');
    const result = await generateTextCompletion(
      'hello world text',
      'sentence',
      'casual',
      'sambanova'
    );
    expect(result).toBe(' direct');
  });

  it('returns empty for an empty SambaNova suggestion', async () => {
    const sambanova = await import('./sambanova.js');
    vi.mocked(sambanova.generateTextCompletionSambaNova).mockResolvedValueOnce(
      ''
    );
    const { generateTextCompletion } = await import('./gemini.js');
    const result = await generateTextCompletion(
      'hello world text',
      'sentence',
      'casual',
      'sambanova'
    );
    expect(result).toBe('');
  });

  it('returns empty for a SambaNova failure', async () => {
    const sambanova = await import('./sambanova.js');
    vi.mocked(sambanova.generateTextCompletionSambaNova).mockRejectedValueOnce(
      new Error('fail')
    );
    const { generateTextCompletion } = await import('./gemini.js');
    const result = await generateTextCompletion(
      'hello world text',
      'sentence',
      'casual',
      'sambanova'
    );
    expect(result).toBe('');
  });

  it('returns empty for a non-rate-limit Gemini failure', async () => {
    const { GoogleGenAI } = await import('@google/genai');
    const instance = new (GoogleGenAI as any)();
    instance.models.generateContent.mockRejectedValueOnce(new Error('network'));
    const { generateTextCompletion } = await import('./gemini.js');
    const result = await generateTextCompletion(
      'hello world text',
      'sentence',
      'casual',
      'gemini'
    );
    expect(result).toBe('');
  });

  it('returns a word suggestion without a leading space', async () => {
    const { GoogleGenAI } = await import('@google/genai');
    const instance = new (GoogleGenAI as any)();
    instance.models.generateContent.mockResolvedValueOnce({ text: 'next' });
    const { generateTextCompletion } = await import('./gemini.js');
    const result = await generateTextCompletion(
      'hello',
      'word',
      'casual',
      'gemini'
    );
    expect(result).toBe('next');
  });

  it('returns a paragraph suggestion', async () => {
    const { GoogleGenAI } = await import('@google/genai');
    const instance = new (GoogleGenAI as any)();
    instance.models.generateContent.mockResolvedValueOnce({
      text: 'paragraph',
    });
    const { generateTextCompletion } = await import('./gemini.js');
    const result = await generateTextCompletion(
      'hello world text',
      'paragraph',
      'casual',
      'gemini'
    );
    expect(result).toBe(' paragraph');
  });

  it('handles a failed SambaNova fallback', async () => {
    const err = new Error('quota exceeded');
    (err as any).status = 429;
    const { GoogleGenAI } = await import('@google/genai');
    const instance = new (GoogleGenAI as any)();
    instance.models.generateContent.mockRejectedValueOnce(err);
    const sambanova = await import('./sambanova.js');
    vi.mocked(sambanova.generateTextCompletionSambaNova).mockRejectedValueOnce(
      new Error('fail')
    );
    const { generateTextCompletion } = await import('./gemini.js');
    const result = await generateTextCompletion(
      'hello world text',
      'sentence',
      'casual',
      'auto'
    );
    expect(result).toBe('');
  });
});

describe('shared gemini missed branches', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.GEMINI_API_KEY = 'test-key';
  });

  it('returns empty for an empty auto-mode suggestion', async () => {
    const { GoogleGenAI } = await import('@google/genai');
    const instance = new (GoogleGenAI as any)();
    instance.models.generateContent.mockResolvedValueOnce({ text: '' });
    const { generateTextCompletion } = await import('./gemini.js');
    const result = await generateTextCompletion(
      'hello world text',
      'sentence',
      'casual',
      'auto'
    );
    expect(result).toBe('');
  });

  it('returns a word suggestion without a leading space in auto mode', async () => {
    const { GoogleGenAI } = await import('@google/genai');
    const instance = new (GoogleGenAI as any)();
    instance.models.generateContent.mockResolvedValueOnce({ text: 'next' });
    const { generateTextCompletion } = await import('./gemini.js');
    const result = await generateTextCompletion(
      'hello',
      'word',
      'casual',
      'auto'
    );
    expect(result).toBe('next');
  });
});
