import { describe, it, expect, vi, beforeEach } from 'vitest';

const { createMock } = vi.hoisted(() => ({
  createMock: vi.fn(),
}));

vi.mock('openai', () => ({
  default: vi.fn().mockImplementation(() => ({
    chat: {
      completions: {
        create: (...args: unknown[]) => createMock(...args),
      },
    },
  })),
}));

vi.mock('./logger.js', () => ({
  logger: { info: vi.fn(), error: vi.fn(), warn: vi.fn(), debug: vi.fn() },
}));

vi.mock('./prompts.js', () => ({
  buildSystemPrompt: vi.fn().mockReturnValue('prompt'),
}));

describe('generateTextCompletionOpenRouter', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.OPENROUTER_API_KEY = 'test-key';
  });

  it('returns a suggestion for a sentence', async () => {
    createMock.mockResolvedValueOnce({
      choices: [{ message: { content: 'world' } }],
    });
    const { generateTextCompletionOpenRouter } = await import(
      './openrouter.js'
    );
    const result = await generateTextCompletionOpenRouter(
      'hello',
      'sentence',
      'casual'
    );
    expect(result).toBe(' world');
  });

  it('returns a suggestion without a leading space for word mode', async () => {
    createMock.mockResolvedValueOnce({
      choices: [{ message: { content: 'next' } }],
    });
    const { generateTextCompletionOpenRouter } = await import(
      './openrouter.js'
    );
    const result = await generateTextCompletionOpenRouter(
      'hello',
      'word',
      'casual'
    );
    expect(result).toBe('next');
  });

  it('returns a spaced suggestion for word mode when text ends with space', async () => {
    createMock.mockResolvedValueOnce({
      choices: [{ message: { content: 'next' } }],
    });
    const { generateTextCompletionOpenRouter } = await import(
      './openrouter.js'
    );
    const result = await generateTextCompletionOpenRouter(
      'hello ',
      'word',
      'casual'
    );
    expect(result).toBe(' next');
  });

  it('returns a suggestion for paragraph mode', async () => {
    createMock.mockResolvedValueOnce({
      choices: [{ message: { content: 'more text' } }],
    });
    const { generateTextCompletionOpenRouter } = await import(
      './openrouter.js'
    );
    const result = await generateTextCompletionOpenRouter(
      'hello',
      'paragraph',
      'casual'
    );
    expect(result).toBe(' more text');
  });

  it('returns empty when the suggestion is empty', async () => {
    createMock.mockResolvedValueOnce({
      choices: [{ message: { content: '' } }],
    });
    const { generateTextCompletionOpenRouter } = await import(
      './openrouter.js'
    );
    const result = await generateTextCompletionOpenRouter(
      'hello',
      'sentence',
      'casual'
    );
    expect(result).toBe('');
  });

  it('returns empty when there is no message content', async () => {
    createMock.mockResolvedValueOnce({
      choices: [{ message: { content: undefined } }],
    });
    const { generateTextCompletionOpenRouter } = await import(
      './openrouter.js'
    );
    const result = await generateTextCompletionOpenRouter(
      'hello',
      'sentence',
      'casual'
    );
    expect(result).toBe('');
  });

  it('returns empty when choices is empty', async () => {
    createMock.mockResolvedValueOnce({ choices: [] });
    const { generateTextCompletionOpenRouter } = await import(
      './openrouter.js'
    );
    const result = await generateTextCompletionOpenRouter(
      'hello',
      'sentence',
      'casual'
    );
    expect(result).toBe('');
  });

  it('returns empty when the API call throws', async () => {
    createMock.mockRejectedValueOnce(new Error('fail'));
    const { generateTextCompletionOpenRouter } = await import(
      './openrouter.js'
    );
    const result = await generateTextCompletionOpenRouter(
      'hello',
      'sentence',
      'casual'
    );
    expect(result).toBe('');
  });

  it('returns empty when the request times out', async () => {
    createMock.mockImplementationOnce(
      () =>
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('openrouter timeout')), 100)
        )
    );
    const { generateTextCompletionOpenRouter } = await import(
      './openrouter.js'
    );
    const result = await generateTextCompletionOpenRouter(
      'hello',
      'sentence',
      'casual'
    );
    expect(result).toBe('');
  });

  it('throws when there is no API key', async () => {
    delete process.env.OPENROUTER_API_KEY;
    const { generateTextCompletionOpenRouter } = await import(
      './openrouter.js'
    );
    await expect(
      generateTextCompletionOpenRouter('hello', 'sentence', 'casual')
    ).rejects.toThrow(/OPENROUTER_API_KEY is not set/);
  });

  it('passes an AbortSignal to the SDK and aborts it on timeout', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    let capturedSignal: AbortSignal | undefined;
    createMock.mockImplementationOnce(
      (_body: unknown, options?: { signal?: AbortSignal }) => {
        capturedSignal = options?.signal;
        return new Promise((_, reject) => {
          capturedSignal?.addEventListener('abort', () =>
            reject(new Error('aborted'))
          );
        });
      }
    );

    const { generateTextCompletionOpenRouter } = await import(
      './openrouter.js'
    );
    const promise = generateTextCompletionOpenRouter(
      'hello',
      'sentence',
      'casual'
    );
    // Advance past the 30s timeout so the controller fires.
    await vi.advanceTimersByTimeAsync(31000);
    const result = await promise;

    expect(result).toBe('');
    expect(capturedSignal).toBeInstanceOf(AbortSignal);
    expect(capturedSignal?.aborted).toBe(true);
    vi.useRealTimers();
  });
});
