import { describe, it, expect } from 'vitest';
import { buildSystemPrompt } from './prompts.js';

describe('buildSystemPrompt', () => {
  it('should build prompt for word mode', () => {
    const prompt = buildSystemPrompt('word', 'casual');
    expect(prompt).toContain('1-3 words');
    expect(prompt).toContain('casual');
  });

  it('should build prompt for sentence mode', () => {
    const prompt = buildSystemPrompt('sentence', 'formal');
    expect(prompt).toContain('sentence');
    expect(prompt).toContain('formal');
  });

  it('should build prompt for paragraph mode', () => {
    const prompt = buildSystemPrompt('paragraph', 'technical');
    expect(prompt).toContain('paragraph');
    expect(prompt).toContain('technical');
  });

  it('should include completion instructions', () => {
    const prompt = buildSystemPrompt('sentence', 'casual');
    expect(prompt).toContain('Do NOT repeat');
    expect(prompt).toContain('Only provide the continuation');
  });

  it('should use creative style language', () => {
    const prompt = buildSystemPrompt('sentence', 'creative');
    expect(prompt).toContain('creative');
    expect(prompt).toContain('expressive');
    expect(prompt).toContain('vivid descriptions');
  });

  it('should use casual style language as the default', () => {
    const prompt = buildSystemPrompt('sentence', 'casual');
    expect(prompt).toContain('casual');
    expect(prompt).toContain('conversational');
  });

  it('should use casual style when an unknown style is passed', () => {
    const prompt = buildSystemPrompt(
      'sentence',
      'unknown' as 'casual' | 'formal' | 'creative' | 'technical'
    );
    expect(prompt).toContain('casual');
    expect(prompt).toContain('conversational');
  });

  it('should combine mode and style instructions', () => {
    const prompt = buildSystemPrompt('paragraph', 'formal');
    expect(prompt).toContain('paragraph');
    expect(prompt).toContain('formal');
    expect(prompt).toContain('professional');
    expect(prompt).toContain('Do NOT repeat');
  });
});
