export function buildSystemPrompt(
  mode: 'word' | 'sentence' | 'paragraph',
  style: 'casual' | 'formal' | 'creative' | 'technical'
): string {
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

  return systemPrompt;
}
