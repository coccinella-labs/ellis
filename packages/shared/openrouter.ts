import OpenAI from 'openai';
import { buildSystemPrompt } from './prompts.js';
import { logger } from './logger.js';

function getOpenRouterClient() {
  const apiKey = process.env.OPENROUTER_API_KEY || '';
  if (!apiKey) {
    throw new Error(
      'OPENROUTER_API_KEY is not set. OpenRouter requires an API key ' +
        'even for its free models. Get one at https://openrouter.ai/keys.'
    );
  }
  return new OpenAI({
    apiKey,
    baseURL: 'https://openrouter.ai/api/v1',
    defaultHeaders: {
      // Optional attribution so the app appears on the OpenRouter leaderboards.
      'HTTP-Referer':
        process.env.HTTP_REFERER || 'https://github.com/coccinella-labs/ellis',
      'X-OpenRouter-Title': 'Ellis',
    },
  });
}

export async function generateTextCompletionOpenRouter(
  currentText: string,
  mode: 'word' | 'sentence' | 'paragraph' = 'sentence',
  style: 'casual' | 'formal' | 'creative' | 'technical' = 'casual',
  model: string = 'openrouter/free'
): Promise<string> {
  const client = getOpenRouterClient();

  try {
    const systemPrompt = buildSystemPrompt(mode, style);

    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: currentText },
    ];

    const response = (await Promise.race([
      client.chat.completions.create({
        model,
        messages,
        max_tokens: mode === 'word' ? 10 : mode === 'sentence' ? 50 : 150,
        temperature: 0.7,
        stream: false,
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('openrouter timeout')), 30000)
      ),
    ])) as any;

    const content = response.choices[0]?.message?.content?.trim() || '';

    if (!content) {
      console.log('No suggestion extracted from OpenRouter response');
      return '';
    }

    if (mode === 'word' && !currentText.endsWith(' ')) {
      return content;
    }

    logger.info(`Generated OpenRouter suggestion (${model})`);
    return content.startsWith(' ') ? content : ' ' + content;
  } catch {
    logger.error('OpenRouter generation failed');
    return '';
  }
}
