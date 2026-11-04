import OpenAI from 'openai';
import { buildSystemPrompt } from './prompts.js';
import { logger } from './logger.js';

function getSambaNovaClient() {
  return new OpenAI({
    apiKey: process.env.SAMBANOVA_API_KEY || '',
    baseURL: 'https://api.sambanova.ai/v1',
  });
}

export async function generateTextCompletionSambaNova(
  currentText: string,
  mode: 'word' | 'sentence' | 'paragraph' = 'sentence',
  style: 'casual' | 'formal' | 'creative' | 'technical' = 'casual'
): Promise<string> {
  const client = getSambaNovaClient();

  try {
    const systemPrompt = buildSystemPrompt(mode, style);

    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: currentText },
    ];

    const response = (await Promise.race([
      client.chat.completions.create({
        model: 'gpt-oss-120b',
        messages,
        max_tokens: mode === 'word' ? 10 : mode === 'sentence' ? 50 : 150,
        temperature: 0.7,
        stream: false,
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('sambanova timeout')), 30000)
      ),
    ])) as any; // eslint-disable-line @typescript-eslint/no-explicit-any

    // SambaNova returns response in 'content' field
    const content = response.choices[0]?.message?.content?.trim() || '';
    const suggestion = content;

    if (!suggestion) {
      console.log('No suggestion extracted from SambaNova response');
      return '';
    }

    if (mode === 'word' && !currentText.endsWith(' ')) {
      return suggestion;
    }

    logger.info(`Generated SambaNova suggestion`);
    return suggestion.startsWith(' ') ? suggestion : ' ' + suggestion;
  } catch {
    logger.error('SambaNova generation failed');
    return '';
  }
}
