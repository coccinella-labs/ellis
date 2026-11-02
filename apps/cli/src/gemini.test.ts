import { describe, it, expect } from 'vitest';
import { buildSystemPrompt } from './gemini';

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

import { vi } from 'vitest';

vi.mock('@google/genai', () => {
  const generateContent = vi.fn().mockResolvedValue({ text: ' hello' });
  return {
    GoogleGenAI: vi
      .fn()
      .mockImplementation(() => ({ models: { generateContent } })),
  };
});

describe('generateTextCompletion CLI', () => {
  it('returns suggestion', async () => {
    const { generateTextCompletion } = await import('./gemini.js');
    const result = await generateTextCompletion(
      'hello world text',
      'sentence',
      'casual'
    );
    expect(result).toBe(' hello');
  });
});
