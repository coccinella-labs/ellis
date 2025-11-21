import { describe, it, expect } from 'vitest';
import {
  textCompletionRequestSchema,
  textCompletionResponseSchema,
} from './schema.js';

describe('textCompletionRequestSchema', () => {
  it('should validate a valid request', () => {
    const validRequest = {
      text: 'hello world',
      mode: 'sentence',
      style: 'casual',
    };

    const result = textCompletionRequestSchema.safeParse(validRequest);
    expect(result.success).toBe(true);
  });

  it('should validate request with all optional fields', () => {
    const fullRequest = {
      text: 'hello world',
      mode: 'sentence',
      style: 'casual',
      provider: 'auto',
      geminiModel: 'gemini-2.5-pro',
      geminiApiKey: 'test-key',
      sambaNovaApiKey: 'test-key',
    };

    const result = textCompletionRequestSchema.safeParse(fullRequest);
    expect(result.success).toBe(true);
  });

  it('should provide defaults', () => {
    const minimalRequest = {
      text: 'hello world',
    };

    const result = textCompletionRequestSchema.safeParse(minimalRequest);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.mode).toBe('sentence');
      expect(result.data.style).toBe('casual');
      expect(result.data.provider).toBe('auto');
      expect(result.data.geminiModel).toBe('gemini-3-pro-preview');
    }
  });

  it('should reject invalid mode', () => {
    const invalidRequest = {
      text: 'hello world',
      mode: 'invalid',
      style: 'casual',
    };

    const result = textCompletionRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });

  it('should reject invalid provider', () => {
    const invalidRequest = {
      text: 'hello world',
      provider: 'invalid',
    };

    const result = textCompletionRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });
});

describe('textCompletionResponseSchema', () => {
  it('should validate a valid response', () => {
    const validResponse = {
      suggestion: 'test suggestion',
    };

    const result = textCompletionResponseSchema.safeParse(validResponse);
    expect(result.success).toBe(true);
  });

  it('should accept empty suggestion', () => {
    const emptyResponse = {
      suggestion: '',
    };

    const result = textCompletionResponseSchema.safeParse(emptyResponse);
    expect(result.success).toBe(true);
  });
});
