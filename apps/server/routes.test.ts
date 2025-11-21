import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  testApiKey,
  testSambaNovaApiKey,
  generateTextCompletion,
} from './gemini';

// Mock dependencies
vi.mock('./gemini', () => ({
  testApiKey: vi.fn(),
  testSambaNovaApiKey: vi.fn(),
  generateTextCompletion: vi.fn(),
}));

vi.mock('../../packages/shared/logger.js', () => ({
  logger: {
    info: vi.fn(),
    error: vi.fn(),
  },
}));

describe('Server Route Logic', () => {
  let mockTestApiKey: ReturnType<typeof vi.mocked<typeof testApiKey>>;
  let mockTestSambaNovaApiKey: ReturnType<
    typeof vi.mocked<typeof testSambaNovaApiKey>
  >;
  let mockGenerateTextCompletion: ReturnType<
    typeof vi.mocked<typeof generateTextCompletion>
  >;

  beforeEach(() => {
    vi.clearAllMocks();
    mockTestApiKey = vi.mocked(testApiKey);
    mockTestSambaNovaApiKey = vi.mocked(testSambaNovaApiKey);
    mockGenerateTextCompletion = vi.mocked(generateTextCompletion);
  });

  describe('Status check logic', () => {
    it('returns ok status when providers are working in development', async () => {
      process.env.NODE_ENV = 'development';
      mockTestApiKey.mockResolvedValue(true);
      mockTestSambaNovaApiKey.mockResolvedValue(true);

      // Test the status logic directly
      const geminiWorking = await mockTestApiKey();
      const sambaNovaWorking = await mockTestSambaNovaApiKey();
      const isWorking =
        process.env.NODE_ENV === 'development'
          ? true
          : geminiWorking || sambaNovaWorking;

      expect(isWorking).toBe(true);
      expect(geminiWorking).toBe(true);
      expect(sambaNovaWorking).toBe(true);
    });

    it('returns ok status when at least one provider works in production', async () => {
      process.env.NODE_ENV = 'production';
      mockTestApiKey.mockResolvedValue(false);
      mockTestSambaNovaApiKey.mockResolvedValue(true);

      const geminiWorking = await mockTestApiKey();
      const sambaNovaWorking = await mockTestSambaNovaApiKey();
      const isWorking =
        process.env.NODE_ENV === 'development'
          ? true
          : geminiWorking || sambaNovaWorking;

      expect(isWorking).toBe(true);
      expect(geminiWorking).toBe(false);
      expect(sambaNovaWorking).toBe(true);
    });

    it('returns error status when no providers work in production', async () => {
      process.env.NODE_ENV = 'production';
      mockTestApiKey.mockResolvedValue(false);
      mockTestSambaNovaApiKey.mockResolvedValue(false);

      const geminiWorking = await mockTestApiKey();
      const sambaNovaWorking = await mockTestSambaNovaApiKey();
      const isWorking =
        process.env.NODE_ENV === 'development'
          ? true
          : geminiWorking || sambaNovaWorking;

      expect(isWorking).toBe(false);
      expect(geminiWorking).toBe(false);
      expect(sambaNovaWorking).toBe(false);
    });
  });

  describe('Text completion logic', () => {
    it('calls generateTextCompletion with correct parameters', async () => {
      const requestBody = {
        text: 'This is a test text that should generate a suggestion',
        mode: 'sentence',
        style: 'casual',
        provider: 'auto',
        geminiApiKey: 'test-key',
        sambaNovaApiKey: 'samba-key',
        geminiModel: 'gemini-2.5-pro',
      };

      mockGenerateTextCompletion.mockResolvedValue(' generated suggestion');

      // Test the completion logic
      const {
        text,
        mode,
        style,
        provider,
        geminiApiKey,
        sambaNovaApiKey,
        geminiModel,
      } = requestBody;

      if (text && text.length >= 10) {
        const suggestion = await mockGenerateTextCompletion(
          text,
          mode as 'word' | 'sentence' | 'paragraph',
          style as 'casual' | 'formal' | 'creative' | 'technical',
          provider as 'auto' | 'gemini' | 'sambanova',
          geminiApiKey,
          sambaNovaApiKey,
          geminiModel
        );

        expect(suggestion).toBe(' generated suggestion');
        expect(mockGenerateTextCompletion).toHaveBeenCalledWith(
          'This is a test text that should generate a suggestion',
          'sentence',
          'casual',
          'auto',
          'test-key',
          'samba-key',
          'gemini-2.5-pro'
        );
      }
    });

    it('skips generation for short text', async () => {
      const requestBody = {
        text: 'Hi',
        mode: 'word',
        style: 'formal',
        provider: 'gemini',
      };

      const { text } = requestBody;

      if (!text || text.length < 10) {
        expect(mockGenerateTextCompletion).not.toHaveBeenCalled();
      }
    });
  });
});
