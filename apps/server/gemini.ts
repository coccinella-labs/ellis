import { ai, generateTextCompletion } from '../../packages/shared/gemini.js';
import { generateTextCompletionSambaNova } from '../../packages/shared/sambanova.js';

export async function testApiKey(): Promise<boolean> {
  try {
    console.log('Testing Gemini API key...');
    if (!process.env.GEMINI_API_KEY) {
      console.log('No Gemini API key set');
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
    console.log('Gemini test failed:', error);
    return false;
  }
}

export async function testSambaNovaApiKey(): Promise<boolean> {
  try {
    console.log('Testing SambaNova API key...');
    console.log('SambaNova API key present:', !!process.env.SAMBANOVA_API_KEY);
    if (!process.env.SAMBANOVA_API_KEY) {
      console.log('No SambaNova API key set');
      return false;
    }
    // Test with a simple completion
    const result = await generateTextCompletionSambaNova(
      'Hello',
      'word',
      'casual'
    );
    const success = !!result?.trim();
    console.log('SambaNova test result:', success, 'response:', result);
    return success;
  } catch (error) {
    console.log('SambaNova test failed:', error);
    return false;
  }
}

export { generateTextCompletion };
