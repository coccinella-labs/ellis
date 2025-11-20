import OpenAI from 'openai';

const sambanova = new OpenAI({
  apiKey: process.env.SAMBANOVA_API_KEY || '',
  baseURL: 'https://api.sambanova.ai/v1',
});

console.log('SambaNova API key loaded:', !!process.env.SAMBANOVA_API_KEY);

export async function generateTextCompletionSambaNova(
  currentText: string,
  mode: 'word' | 'sentence' | 'paragraph' = 'sentence',
  style: 'casual' | 'formal' | 'creative' | 'technical' = 'casual'
): Promise<string> {
  console.log('Generating text completion with SambaNova:', {
    currentText,
    mode,
    style,
  });

  try {
    const systemPrompt = buildSystemPrompt(mode, style);

    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: currentText },
    ];

    console.log('Making SambaNova API call with messages:', messages);

    const response = await sambanova.chat.completions.create({
      model: 'gpt-oss-120b',
      messages,
      max_tokens: mode === 'word' ? 10 : mode === 'sentence' ? 50 : 150,
      temperature: 0.7,
      stream: false,
    });

    console.log('SambaNova raw response:', JSON.stringify(response, null, 2));

    // SambaNova returns response in 'reasoning' field instead of 'content'
    const content = response.choices[0]?.message?.content?.trim() || '';
    const message = response.choices[0]?.message as any; // Cast to any to access reasoning field
    const reasoning = message?.reasoning?.trim() || '';
    const suggestion = content || reasoning;

    console.log('SambaNova extracted suggestion:', `"${suggestion}"`);
    console.log(
      'Content field:',
      `"${content}"`,
      'Reasoning field:',
      `"${reasoning}"`
    );

    if (!suggestion) {
      console.log('No suggestion extracted from SambaNova response');
      return '';
    }

    if (mode === 'word' && !currentText.endsWith(' ')) {
      return suggestion;
    }

    console.log('Generated SambaNova suggestion:', suggestion);
    return suggestion.startsWith(' ') ? suggestion : ' ' + suggestion;
  } catch (error) {
    console.error('SambaNova generation error:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    return '';
  }
}

function buildSystemPrompt(
  mode: 'word' | 'sentence' | 'paragraph',
  style: 'casual' | 'formal' | 'creative' | 'technical'
): string {
  const modeInstructions = {
    word: 'Complete the current word naturally. Keep it short.',
    sentence: 'Complete the sentence naturally and coherently.',
    paragraph: 'Continue the paragraph with relevant content.',
  };

  const styleInstructions = {
    casual: 'Use everyday language, contractions, and a friendly tone.',
    formal:
      'Use proper grammar, complete sentences, and professional language.',
    creative: 'Be imaginative, use metaphors, and add creative flair.',
    technical: 'Use precise, technical language and industry-specific terms.',
  };

  return `You are an AI writing assistant. ${modeInstructions[mode]} ${styleInstructions[style]} Only provide the completion text, no explanations.`;
}
