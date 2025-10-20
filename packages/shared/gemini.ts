import { GoogleGenAI } from '@google/genai';
import { buildSystemPrompt } from './prompts.js';

export const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function generateTextCompletion(
  currentText: string,
  mode: 'word' | 'sentence' | 'paragraph' = 'sentence',
  style: 'casual' | 'formal' | 'creative' | 'technical' = 'casual',
  model: string = 'gemini-2.0-flash'
): Promise<string> {
  console.log('Generating text completion for:', { currentText, mode, style });
  try {
    const systemPrompt = buildSystemPrompt(mode, style);

    const response = await ai.models.generateContent({
      model,
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
