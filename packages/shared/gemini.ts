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
    } catch (error) {
      console.error('SambaNova generation error:', error);
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
        console.log('Generated OpenRouter suggestion:', suggestion);
        return suggestion;
      }
    } catch (error) {
      console.error('OpenRouter generation error:', error);
    }
    return '';
  }

  if (provider === 'gemini') {
    // Only try Gemini
    try {
      const systemPrompt = buildSystemPrompt(mode, style);
      const model = geminiModel;

      const response = (await Promise.race([
        geminiClient.models.generateContent({
          model,
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.7,
            maxOutputTokens:
              mode === 'word' ? 10 : mode === 'sentence' ? 50 : 150,
          },
          contents: currentText,
        }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('gemini timeout')), 30000)
        ),
      ])) as any; // eslint-disable-line @typescript-eslint/no-explicit-any

      const suggestion = response.text?.trim() || '';

      if (!suggestion) {
        return '';
      }

      if (mode === 'word' && !currentText.endsWith(' ')) {
        return suggestion;
      }

      logger.info(`Generated Gemini suggestion (${model})`);
      return ' ' + suggestion;
    } catch {
      logger.error('Gemini generation failed');
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

    const response = (await Promise.race([
      geminiClient.models.generateContent({
        model,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7,
          maxOutputTokens:
            mode === 'word' ? 10 : mode === 'sentence' ? 50 : 150,
        },
        contents: currentText,
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('gemini timeout')), 30000)
      ),
    ])) as any; // eslint-disable-line @typescript-eslint/no-explicit-any

    const suggestion = response.text?.trim() || '';

    if (!suggestion) {
      return '';
    }

    if (mode === 'word' && !currentText.endsWith(' ')) {
      return suggestion;
    }

    logger.info(`Generated Gemini suggestion (${model})`);
    return ' ' + suggestion;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    logger.error('Gemini generation failed');

    // Check if it's a rate limit error (429)
    if (
      error?.status === 429 ||
      error?.message?.includes('quota') ||
      error?.message?.includes('RESOURCE_EXHAUSTED')
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
