import { ai, generateTextCompletion } from '@shared/gemini';
import { generateTextCompletionSambaNova } from '@shared/sambanova';
import { generateTextCompletionOpenRouter } from '@shared/openrouter';
import { generateTextCompletionAtlasCloud } from '@shared/atlascloud';
import { logger } from '@shared/logger';

export async function testApiKey(): Promise<boolean> {
  try {
    logger.info('Testing Gemini API key...');
    if (!process.env.GEMINI_API_KEY) {
      logger.warn('No Gemini API key set');
      return false;
    }
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
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
  } catch {
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
  } catch {
    logger.error('SambaNova test failed');
    return false;
  }
}

export async function testOpenRouterApiKey(): Promise<boolean> {
  try {
    logger.info('Testing OpenRouter API key...');
    if (!process.env.OPENROUTER_API_KEY) {
      logger.warn('No OpenRouter API key set');
      return false;
    }
    const result = await generateTextCompletionOpenRouter(
      'Hello',
      'word',
      'casual'
    );
    const success = !!result?.trim();
    logger.info(`OpenRouter test result: ${success}`);
    return success;
  } catch {
    logger.error('OpenRouter test failed');
    return false;
  }
}

export async function testAtlasCloudApiKey(): Promise<boolean> {
  try {
    logger.info('Testing AtlasCloud API key...');
    if (!process.env.ATLASCLOUD_API_KEY) {
      logger.warn('No AtlasCloud API key set');
      return false;
    }
    const result = await generateTextCompletionAtlasCloud(
      'Hello',
      'word',
      'casual'
    );
    const success = !!result?.trim();
    logger.info(`AtlasCloud test result: ${success}`);
    return success;
  } catch {
    logger.error('AtlasCloud test failed');
    return false;
  }
}

export { generateTextCompletion };
