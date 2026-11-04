import OpenAI from 'openai';
import { buildSystemPrompt } from './prompts.js';
import { logger } from './logger.js';

function getSambaNovaClient() {
  const apiKey = process.env.SAMBANOVA_API_KEY || '';
  if (!apiKey) {
    throw new Error(
      'SAMBANOVA_API_KEY is not set. Get one at https://sambanova.ai/.'
    );
  }
  return new OpenAI({
    apiKey,
    baseURL: 'https://api.sambanova.ai/v1',
  });
}

export async function generateTextCompletionSambaNova(
  currentText: string,
  mode: 'word' | 'sentence' | 'paragraph' = 'sentence',
  style: 'casual' | 'formal' | 'creative' | 'technical' = 'casual'
): Promise<string> {
  const client = getSambaNovaClient();

  const systemPrompt = buildSystemPrompt(mode, style);

  const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: currentText },
  ];

  // AbortController cancels the underlying HTTP request when the timeout
  // fires; Promise.race alone would leave the request running in the
  // background. The timer is cleared in finally so it always runs,
  // whether the request succeeds, fails, or times out.
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  try {
    const response = await client.chat.completions.create(
      {
        model: 'gpt-oss-120b',
        messages,
        max_tokens: mode === 'word' ? 10 : mode === 'sentence' ? 50 : 150,
        temperature: 0.7,
        stream: false,
      },
      { signal: controller.signal }
    );

    // SambaNova returns response in 'content' field
    const content = response.choices[0]?.message?.content?.trim() || '';
    const suggestion = content;

    if (!suggestion) {
      logger.warn('No suggestion extracted from SambaNova response');
      return '';
    }

    if (mode === 'word' && !currentText.endsWith(' ')) {
      return suggestion;
    }

    logger.info('Generated SambaNova suggestion');
    return suggestion.startsWith(' ') ? suggestion : ' ' + suggestion;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      logger.error('SambaNova request timed out');
    } else {
      logger.error('SambaNova generation failed');
    }
    return '';
  } finally {
    clearTimeout(timeoutId);
  }
}
