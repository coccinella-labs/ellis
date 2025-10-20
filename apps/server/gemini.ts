import { ai, generateTextCompletion } from '../../packages/shared/gemini.js';

export async function testApiKey(): Promise<boolean> {
  try {
    console.log('Testing API key...');
    if (!process.env.GEMINI_API_KEY) {
      console.log('No API key set');
      return false;
    }
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      config: {
        systemInstruction: 'Respond with "ok"',
        temperature: 0,
        maxOutputTokens: 5,
      },
      contents: 'Hello world',
    });
    const result = !!response.text?.trim();
    console.log('Test result:', result);
    return result;
  } catch (error) {
    console.log('Test failed:', error);
    return false;
  }
}

export { generateTextCompletion };
