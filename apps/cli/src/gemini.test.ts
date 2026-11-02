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
