import { GoogleGenAI } from '@google/genai';
import { buildSystemPrompt } from './prompts.js';
import { generateTextCompletionSambaNova } from './sambanova.js';
import { generateTextCompletionOpenRouter } from './openrouter.js';
import { logger } from './logger.js';

export const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function generateTextCompletion(
  currentText: string,
  mode: 'word' | 'sentence' | 'paragraph' = 'sentence',
  style: 'casual' | 'formal' | 'creative' | 'technical' = 'casual',
  provider: 'auto' | 'gemini' | 'sambanova' | 'openrouter' = 'auto',
  geminiModel: string = 'gemini-3.8-flash'
): Promise<string> {
  logger.info(`Generating text completion with ${provider} (${geminiModel})`);

  const geminiClient = ai;

  if (provider === 'sambanova') {
    // Only try SambaNova
    try {
      const suggestion = await generateTextCompletionSambaNova(
        currentText,
        mode,
        style
      );
      if (suggestion) {
        logger.info('Generated SambaNova suggestion');
        return suggestion;
      }
    } catch {
      logger.error('SambaNova generation failed');
    }
    return '';
  }

  if (provider === 'openrouter') {
    // Only try OpenRouter
    try {
      const suggestion = await generateTextCompletionOpenRouter(
        currentText,
        mode,
        style
      );
      if (suggestion) {
        logger.info('Generated OpenRouter suggestion');
        return suggestion;
      }
    } catch {
      logger.error('OpenRouter generation failed');
    }
    return '';
  }

  if (provider === 'gemini') {
    // Only try Gemini
    try {
      const systemPrompt = buildSystemPrompt(mode, style);
      const model = geminiModel;

      // AbortController cancels the underlying HTTP request when the timeout
      // fires; Promise.race alone would leave the request running in the
      // background. The timer is cleared in finally so it always runs.
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      try {
        const response = await geminiClient.models.generateContent({
          model,
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.7,
            maxOutputTokens:
              mode === 'word' ? 10 : mode === 'sentence' ? 50 : 150,
            abortSignal: controller.signal,
          },
          contents: currentText,
        });

        const suggestion = response.text?.trim() || '';

        if (!suggestion) {
          return '';
        }

        if (mode === 'word' && !currentText.endsWith(' ')) {
          return suggestion;
        }

        logger.info(`Generated Gemini suggestion (${model})`);
        return ' ' + suggestion;
      } finally {
        clearTimeout(timeoutId);
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        logger.error('Gemini request timed out');
      } else {
        logger.error('Gemini generation failed');
      }
      return '';
    }
  }

  // provider === 'auto' - try Gemini first (if key available), then fallback
  const hasGeminiKey = !!process.env.GEMINI_API_KEY;

  // Skip Gemini if no API key available
  if (!hasGeminiKey) {
    logger.info('No Gemini API key, trying SambaNova then OpenRouter');
    return tryFallbackChain(currentText, mode, style);
  }

  try {
    const systemPrompt = buildSystemPrompt(mode, style);
    const model = geminiModel;

    // AbortController cancels the underlying HTTP request when the timeout
    // fires; Promise.race alone would leave the request running in the
    // background. The timer is cleared in finally so it always runs.
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    try {
      const response = await geminiClient.models.generateContent({
        model,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7,
          maxOutputTokens:
            mode === 'word' ? 10 : mode === 'sentence' ? 50 : 150,
          abortSignal: controller.signal,
        },
        contents: currentText,
      });

      const suggestion = response.text?.trim() || '';

      if (!suggestion) {
        return '';
      }

      if (mode === 'word' && !currentText.endsWith(' ')) {
        return suggestion;
      }

      logger.info(`Generated Gemini suggestion (${model})`);
      return ' ' + suggestion;
    } finally {
      clearTimeout(timeoutId);
    }
  } catch (error) {
    // Log a safe category and provider name, not the raw SDK error object,
    // so no internal SDK details reach the console.
    logger.error('Gemini generation failed');

    // Check if it's a rate limit error (429). The SDK error may carry a
    // numeric `status`, so inspect it defensively without exposing it.
    const status = (error as { status?: unknown }).status;
    const message = error instanceof Error ? error.message : String(error);
    if (
      status === 429 ||
      message.includes('quota') ||
      message.includes('RESOURCE_EXHAUSTED')
    ) {
      logger.warn(
        'Rate limit hit, falling back to SambaNova then OpenRouter...'
      );
      return tryFallbackChain(currentText, mode, style);
    }

    return '';
  }
}

/**
 * Fallback chain: SambaNova first, then OpenRouter. Returns '' if all fail.
 */
async function tryFallbackChain(
  currentText: string,
  mode: 'word' | 'sentence' | 'paragraph',
  style: 'casual' | 'formal' | 'creative' | 'technical'
): Promise<string> {
  // Try SambaNova
  try {
    const suggestion = await generateTextCompletionSambaNova(
      currentText,
      mode,
      style
    );
    if (suggestion) {
      logger.info('Successfully used SambaNova fallback');
      return suggestion;
    }
  } catch {
    logger.error('SambaNova fallback failed');
  }

  // Try OpenRouter
  try {
    const suggestion = await generateTextCompletionOpenRouter(
      currentText,
      mode,
      style
    );
    if (suggestion) {
      logger.info('Successfully used OpenRouter fallback');
      return suggestion;
    }
  } catch {
    logger.error('OpenRouter fallback failed');
  }

  return '';
}
