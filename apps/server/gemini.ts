import { ai, generateTextCompletion } from '../../packages/shared/gemini.js';
import { generateTextCompletionSambaNova } from '../../packages/shared/sambanova.js';
import { logger } from '../../packages/shared/logger.js';

export async function testApiKey(): Promise<boolean> {
  try {
    logger.info('Testing Gemini API key...');
    if (!process.env.GEMINI_API_KEY) {
      logger.warn('No Gemini API key set');
      return false;
    }
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      config: {
        systemInstruction: 'Respond with "ok"',
        temperature: 0,
        maxOutputTokens: 5,
      },
      contents: 'Hello world',
    });
    const result = !!response.text?.trim();
    console.log('Gemini test result:', result);
    return result;
  } catch (error) {
    logger.error('Gemini test failed');
    return false;
  }
}

export async function testSambaNovaApiKey(): Promise<boolean> {
  try {
    logger.info('Testing SambaNova API key...');
    logger.debug('SambaNova API key present:', !!process.env.SAMBANOVA_API_KEY);
    if (!process.env.SAMBANOVA_API_KEY) {
      logger.warn('No SambaNova API key set');
      return false;
    }
    // Test with a simple completion
    const result = await generateTextCompletionSambaNova(
      'Hello',
      'word',
      'casual'
    );
    const success = !!result?.trim();
    logger.info(`SambaNova test result: ${success}`);
    return success;
  } catch (error) {
    logger.error('SambaNova test failed');
    return false;
  }
}

export { generateTextCompletion };
