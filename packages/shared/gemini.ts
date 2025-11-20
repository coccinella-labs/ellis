import { GoogleGenAI } from '@google/genai';
import { buildSystemPrompt } from './prompts.js';
import { generateTextCompletionSambaNova } from './sambanova.js';

export const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function generateTextCompletion(
  currentText: string,
  mode: 'word' | 'sentence' | 'paragraph' = 'sentence',
  style: 'casual' | 'formal' | 'creative' | 'technical' = 'casual',
  provider: 'auto' | 'gemini' | 'sambanova' = 'auto'
): Promise<string> {
  console.log('Generating text completion for:', {
    currentText,
    mode,
    style,
    provider,
  });

  if (provider === 'sambanova') {
    // Only try SambaNova
    try {
      const suggestion = await generateTextCompletionSambaNova(
        currentText,
        mode,
        style
      );
      if (suggestion) {
        console.log('Generated SambaNova suggestion:', suggestion);
        return suggestion;
      }
    } catch (error) {
      console.error('SambaNova generation error:', error);
    }
    return '';
  }

  if (provider === 'gemini') {
    // Only try Gemini
    try {
      const systemPrompt = buildSystemPrompt(mode, style);
      const model = 'gemini-3-pro-preview';

      const response = await ai.models.generateContent({
        model,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7,
          maxOutputTokens:
            mode === 'word' ? 10 : mode === 'sentence' ? 50 : 150,
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
      return '';
    }
  }

  // provider === 'auto' - try Gemini first, then fallback
  try {
    const systemPrompt = buildSystemPrompt(mode, style);
    const model = 'gemini-3-pro-preview';

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
