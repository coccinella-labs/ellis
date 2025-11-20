import { GoogleGenAI } from '@google/genai';
import { buildSystemPrompt } from './prompts.js';
import { generateTextCompletionSambaNova } from './sambanova.js';

export const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function generateTextCompletion(
  currentText: string,
  mode: 'word' | 'sentence' | 'paragraph' = 'sentence',
  style: 'casual' | 'formal' | 'creative' | 'technical' = 'casual',
  model: string = 'gemini-3-pro-preview'
): Promise<string> {
  console.log('Generating text completion for:', { currentText, mode, style });

  // Try Gemini first
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

    console.log('Generated Gemini suggestion:', suggestion);
    return suggestion.startsWith(' ') ? suggestion : ' ' + suggestion;
  } catch (error: any) {
    console.error('Gemini generation error:', error);

    // Check if it's a rate limit error (429)
    if (
      error?.status === 429 ||
      error?.message?.includes('quota') ||
      error?.message?.includes('RESOURCE_EXHAUSTED')
    ) {
      console.log('Rate limit hit, falling back to SambaNova...');

      // Fallback to SambaNova
      try {
        const fallbackSuggestion = await generateTextCompletionSambaNova(
          currentText,
          mode,
          style
        );
        if (fallbackSuggestion) {
          console.log('Successfully used SambaNova fallback');
          return fallbackSuggestion;
        }
      } catch (fallbackError) {
        console.error('SambaNova fallback also failed:', fallbackError);
      }
    }

    return '';
  }
}
