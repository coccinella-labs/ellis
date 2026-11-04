import OpenAI from 'openai';
import { buildSystemPrompt } from './prompts.js';
import { logger } from './logger.js';

function getAtlasCloudClient() {
  const apiKey = process.env.ATLASCLOUD_API_KEY || '';
  if (!apiKey) {
    throw new Error(
      'ATLASCLOUD_API_KEY is not set. AtlasCloud requires an API key. ' +
        'Get one at https://www.atlascloud.ai/.'
    );
  }
  return new OpenAI({
    apiKey,
    baseURL: 'https://api.atlascloud.ai/v1',
  });
}

export async function generateTextCompletionAtlasCloud(
  currentText: string,
  mode: 'word' | 'sentence' | 'paragraph' = 'sentence',
  style: 'casual' | 'formal' | 'creative' | 'technical' = 'casual',
  // AtlasCloud's direct catalog ID. OpenRouter lists the same model as
  // dots-studio/dots-3-note-preview:free, which is not AtlasCloud's ID.
  model: string = 'dots-studio/dots-3-note-prev-free'
): Promise<string> {
  const client = getAtlasCloudClient();

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
        model,
        messages,
        max_tokens: mode === 'word' ? 10 : mode === 'sentence' ? 50 : 150,
        temperature: 0.7,
        stream: false,
      },
      { signal: controller.signal }
    );

    const content = response.choices[0]?.message?.content?.trim() || '';

    if (!content) {
      logger.warn('No suggestion extracted from AtlasCloud response');
      return '';
    }

    if (mode === 'word' && !currentText.endsWith(' ')) {
      return content;
    }

    logger.info(`Generated AtlasCloud suggestion (${model})`);
    return content.startsWith(' ') ? content : ' ' + content;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      logger.error('AtlasCloud request timed out');
    } else {
      logger.error('AtlasCloud generation failed');
    }
    return '';
  } finally {
    clearTimeout(timeoutId);
  }
}
