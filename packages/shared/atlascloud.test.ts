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

describe('generateTextCompletionAtlasCloud', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.ATLASCLOUD_API_KEY = 'test-key';
  });

  it('returns a suggestion for a sentence', async () => {
    createMock.mockResolvedValueOnce({
      choices: [{ message: { content: 'world' } }],
    });
    const { generateTextCompletionAtlasCloud } = await import(
      './atlascloud.js'
    );
    const result = await generateTextCompletionAtlasCloud(
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
    const { generateTextCompletionAtlasCloud } = await import(
      './atlascloud.js'
    );
    const result = await generateTextCompletionAtlasCloud(
      'hello',
      'word',
      'casual'
    );
    expect(result).toBe('next');
  });

  it('returns a suggestion for paragraph mode', async () => {
    createMock.mockResolvedValueOnce({
      choices: [{ message: { content: 'more text' } }],
    });
    const { generateTextCompletionAtlasCloud } = await import(
      './atlascloud.js'
    );
    const result = await generateTextCompletionAtlasCloud(
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
    const { generateTextCompletionAtlasCloud } = await import(
      './atlascloud.js'
    );
    const result = await generateTextCompletionAtlasCloud(
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
    const { generateTextCompletionAtlasCloud } = await import(
      './atlascloud.js'
    );
    const result = await generateTextCompletionAtlasCloud(
      'hello',
      'sentence',
      'casual'
    );
    expect(result).toBe('');
  });

  it('returns empty when choices is empty', async () => {
    createMock.mockResolvedValueOnce({ choices: [] });
    const { generateTextCompletionAtlasCloud } = await import(
      './atlascloud.js'
    );
    const result = await generateTextCompletionAtlasCloud(
      'hello',
      'sentence',
      'casual'
    );
    expect(result).toBe('');
  });

  it('returns empty when the API call throws', async () => {
    createMock.mockRejectedValueOnce(new Error('fail'));
    const { generateTextCompletionAtlasCloud } = await import(
      './atlascloud.js'
    );
    const result = await generateTextCompletionAtlasCloud(
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
          setTimeout(() => reject(new Error('atlascloud timeout')), 100)
        )
    );
    const { generateTextCompletionAtlasCloud } = await import(
      './atlascloud.js'
    );
    const result = await generateTextCompletionAtlasCloud(
      'hello',
      'sentence',
      'casual'
    );
    expect(result).toBe('');
  });

  it('throws when there is no API key', async () => {
    delete process.env.ATLASCLOUD_API_KEY;
    const { generateTextCompletionAtlasCloud } = await import(
      './atlascloud.js'
    );
    await expect(
      generateTextCompletionAtlasCloud('hello', 'sentence', 'casual')
    ).rejects.toThrow(/ATLASCLOUD_API_KEY is not set/);
  });

  it('passes an AbortSignal to the SDK and aborts it on timeout', async () => {
    vi.useFakeTimers();
    try {
      let capturedSignal: AbortSignal | undefined;
      createMock.mockImplementationOnce(
        (_body: unknown, options?: { signal?: AbortSignal }) => {
          capturedSignal = options?.signal;
          return new Promise((_, reject) => {
            capturedSignal?.addEventListener('abort', () =>
              reject(new DOMException('Aborted', 'AbortError'))
            );
          });
        }
      );

      const { generateTextCompletionAtlasCloud } = await import(
        './atlascloud.js'
      );
      const promise = generateTextCompletionAtlasCloud(
        'hello',
        'sentence',
        'casual'
      );
      await vi.advanceTimersByTimeAsync(31000);
      const result = await promise;

      expect(result).toBe('');
      expect(capturedSignal).toBeInstanceOf(AbortSignal);
      expect(capturedSignal?.aborted).toBe(true);
    } finally {
      vi.useRealTimers();
    }
  });
});

describe.skipIf(!process.env.ATLASCLOUD_API_KEY)(
  'AtlasCloud smoke test',
  () => {
    it('returns a suggestion with a real key', async () => {
      const { generateTextCompletionAtlasCloud } = await import(
        './atlascloud.js'
      );
      const result = await generateTextCompletionAtlasCloud(
        'Hello',
        'sentence',
        'casual'
      );
      expect(typeof result).toBe('string');
    });
  }
);
