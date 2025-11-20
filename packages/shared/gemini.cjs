'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.generateTextCompletion = generateTextCompletion;
const genai_1 = require('@google/genai');
const prompts_js_1 = require('./prompts.cjs');
const ai = new genai_1.GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
});
async function generateTextCompletion(
  currentText,
  mode = 'sentence',
  style = 'casual',
  model = 'gemini-3-pro-preview'
) {
  console.log('Generating text completion for:', { currentText, mode, style });
  try {
    const systemPrompt = (0, prompts_js_1.buildSystemPrompt)(mode, style);
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
