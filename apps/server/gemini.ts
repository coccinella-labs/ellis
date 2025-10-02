import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function testApiKey(): Promise<boolean> {
  console.log('Checking if API key is set...');
  const hasKey = !!process.env.GEMINI_API_KEY;
  console.log('API key present:', hasKey);
  return hasKey;
}

export async function generateTextCompletion(
  currentText: string,
  mode: 'word' | 'sentence' | 'paragraph' = 'sentence',
  style: 'casual' | 'formal' | 'creative' | 'technical' = 'casual'
): Promise<string> {
  console.log('Generating text completion for:', { currentText, mode, style });
  try {
    let systemPrompt = '';

    switch (mode) {
      case 'word':
        systemPrompt =
          "You are a helpful writing assistant. Complete the user's text with the next 1-3 words that would naturally follow. Be concise and contextually appropriate.";
        break;
      case 'sentence':
        systemPrompt =
          "You are a helpful writing assistant. Continue the user's text with the next sentence or complete their current sentence naturally.";
        break;
      case 'paragraph':
        systemPrompt =
          "You are a helpful writing assistant. Expand on the user's text with a full paragraph that continues their ideas logically.";
        break;
    }

    switch (style) {
      case 'formal':
        systemPrompt += ' Use formal, professional language.';
        break;
      case 'creative':
        systemPrompt +=
          ' Use creative, expressive language with vivid descriptions.';
        break;
      case 'technical':
        systemPrompt +=
          ' Use precise, technical language appropriate for documentation or technical writing.';
        break;
      case 'casual':
      default:
        systemPrompt += ' Use casual, conversational language.';
        break;
    }

    systemPrompt +=
      " Do NOT repeat the user's text. Only provide the continuation. Keep it brief and natural.";

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
        maxOutputTokens: mode === 'word' ? 10 : mode === 'sentence' ? 50 : 150,
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

    console.log('Generated suggestion:', suggestion);
    return suggestion.startsWith(' ') ? suggestion : ' ' + suggestion;
  } catch (error) {
    console.error('Generation error:', error);
    return '';
  }
}
