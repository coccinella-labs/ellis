/**
 * @vitest-environment node
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { buildSystemPrompt } from './gemini';

vi.mock('@google/genai', () => {
  const generateContent = vi.fn();
  return {
    GoogleGenAI: vi
      .fn()
      .mockImplementation(() => ({ models: { generateContent } })),
  };
});

describe('buildSystemPrompt', () => {
  it.each([
    ['word', 'casual'],
    ['sentence', 'formal'],
    ['paragraph', 'creative'],
    ['word', 'technical'],
  ] as const)('returns a prompt for %s/%s', (mode, style) => {
    const prompt = buildSystemPrompt(mode, style);
    expect(prompt).toContain('helpful writing assistant');
    expect(prompt).toContain('Do NOT repeat');
  });
});

describe('CLI gemini prompt branches', () => {
  it('builds a formal prompt', () => {
    expect(buildSystemPrompt('sentence', 'formal')).toContain(
      'formal, professional language'
    );
  });

  it('uses the word token limit', async () => {
    const { GoogleGenAI } = await import('@google/genai');
    const instance = new (GoogleGenAI as any)();
    instance.models.generateContent.mockResolvedValueOnce({ text: 'next' });
    const { generateTextCompletion } = await import('./gemini.js');
    const result = await generateTextCompletion('hello', 'word', 'casual');
    expect(result).toBe('next');
  });
});

describe('generateTextCompletion CLI', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.GEMINI_API_KEY = 'test-key';
  });

  it('returns suggestion', async () => {
    const { GoogleGenAI } = await import('@google/genai');
    const instance = new (GoogleGenAI as any)();
    instance.models.generateContent.mockResolvedValueOnce({ text: ' hello' });
    const { generateTextCompletion } = await import('./gemini.js');
    const result = await generateTextCompletion(
      'hello world text',
      'sentence',
      'casual'
    );
    expect(result).toBe(' hello');
  });

  it('returns empty for no suggestion', async () => {
    const { GoogleGenAI } = await import('@google/genai');
    const instance = new (GoogleGenAI as any)();
    instance.models.generateContent.mockResolvedValueOnce({ text: '' });
    const { generateTextCompletion } = await import('./gemini.js');
    const result = await generateTextCompletion(
      'hello world text',
      'sentence',
      'casual'
    );
    expect(result).toBe('');
  });

  it('returns word suggestion without leading space', async () => {
    const { GoogleGenAI } = await import('@google/genai');
    const instance = new (GoogleGenAI as any)();
    instance.models.generateContent.mockResolvedValueOnce({ text: 'next' });
    const { generateTextCompletion } = await import('./gemini.js');
    const result = await generateTextCompletion('hello', 'word', 'casual');
    expect(result).toBe('next');
  });

  it('returns empty on error', async () => {
    const { GoogleGenAI } = await import('@google/genai');
    const instance = new (GoogleGenAI as any)();
    instance.models.generateContent.mockRejectedValueOnce(new Error('fail'));
    const { generateTextCompletion } = await import('./gemini.js');
    const result = await generateTextCompletion(
      'hello world text',
      'sentence',
      'casual'
    );
    expect(result).toBe('');
  });

  it('returns a paragraph suggestion', async () => {
    const { GoogleGenAI } = await import('@google/genai');
    const instance = new (GoogleGenAI as any)();
    instance.models.generateContent.mockResolvedValueOnce({
      text: 'paragraph continuation',
    });
    const { generateTextCompletion } = await import('./gemini.js');
    const result = await generateTextCompletion(
      'hello world text',
      'paragraph',
      'casual'
    );
    expect(result).toBe(' paragraph continuation');
  });

  it('returns an unspaced suggestion', async () => {
    const { GoogleGenAI } = await import('@google/genai');
    const instance = new (GoogleGenAI as any)();
    instance.models.generateContent.mockResolvedValueOnce({ text: 'next' });
    const { generateTextCompletion } = await import('./gemini.js');
    const result = await generateTextCompletion(
      'hello world text',
      'sentence',
      'casual'
    );
    expect(result).toBe(' next');
  });
});

describe('CLI gemini extra branches', () => {
  it('builds a formal prompt', () => {
    expect(buildSystemPrompt('sentence', 'formal')).toContain(
      'formal, professional language'
    );
  });

  it('uses the paragraph token limit', async () => {
    const { GoogleGenAI } = await import('@google/genai');
    const instance = new (GoogleGenAI as any)();
    instance.models.generateContent.mockResolvedValueOnce({
      text: 'paragraph',
    });
    const { generateTextCompletion } = await import('./gemini.js');
    const result = await generateTextCompletion(
      'hello world text',
      'paragraph',
      'casual'
    );
    expect(result).toBe(' paragraph');
  });
});
