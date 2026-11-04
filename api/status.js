// packages/shared/gemini.ts
import { GoogleGenAI } from '@google/genai';

// packages/shared/prompts.ts
function buildSystemPrompt(mode, style) {
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

// packages/shared/sambanova.ts
import OpenAI from 'openai';

// packages/shared/logger.ts
var LOG_LEVELS = {
  error: 0,
  warn: 1,
  info: 2,
  log: 3,
  debug: 4,
};
var withTimestamp = (level, message) =>
  `${/* @__PURE__ */ new Date().toISOString()} [${level.toUpperCase()}] ${message}`;
var colors = {
  log: '\x1B[37m',
  info: '\x1B[36m',
  warn: '\x1B[33m',
  error: '\x1B[31m',
  debug: '\x1B[35m',
};
var reset = '\x1B[0m';
function getCurrentLogLevelValue() {
  const envLevel = process.env.LOG_LEVEL;
  return envLevel && LOG_LEVELS[envLevel] !== void 0
    ? LOG_LEVELS[envLevel]
    : LOG_LEVELS.log;
}
function print(level, message, args) {
  if (LOG_LEVELS[level] > getCurrentLogLevelValue()) return;
  const formatted = withTimestamp(level, message);
  const useColor = process.stdout.isTTY;
  const prefix = useColor ? `${colors[level]}${formatted}${reset}` : formatted;
  if (args.length === 0) {
    console[level](prefix);
  } else {
    console[level](prefix, ...args);
  }
}
var logger = {
  setLevel(level) {
    process.env.LOG_LEVEL = level;
  },
  log: (message, ...args) => print('log', message, args),
  info: (message, ...args) => print('info', message, args),
  warn: (message, ...args) => print('warn', message, args),
  error: (message, ...args) => print('error', message, args),
  debug: (message, ...args) => print('debug', message, args),
  /**
   * Structured JSON logging for automated processing
   */
  json(level, data) {
    const currentLevel = getCurrentLogLevelValue();
    if (LOG_LEVELS[level] > currentLevel) return;
    console[level](
      JSON.stringify({
        level,
        timestamp: /* @__PURE__ */ new Date().toISOString(),
        ...data,
      })
    );
  },
};

// packages/shared/sambanova.ts
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
async function generateTextCompletionSambaNova(
  currentText,
  mode = 'sentence',
  style = 'casual'
) {
  const client = getSambaNovaClient();
  const systemPrompt = buildSystemPrompt(mode, style);
  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: currentText },
  ];
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3e4);
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
    return ' ' + suggestion;
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

// packages/shared/openrouter.ts
import OpenAI2 from 'openai';
function getOpenRouterClient() {
  const apiKey = process.env.OPENROUTER_API_KEY || '';
  if (!apiKey) {
    throw new Error(
      'OPENROUTER_API_KEY is not set. OpenRouter requires an API key even for its free models. Get one at https://openrouter.ai/keys.'
    );
  }
  return new OpenAI2({
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
async function generateTextCompletionOpenRouter(
  currentText,
  mode = 'sentence',
  style = 'casual',
  model = 'openrouter/free'
) {
  const client = getOpenRouterClient();
  const systemPrompt = buildSystemPrompt(mode, style);
  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: currentText },
  ];
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3e4);
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
      logger.warn('No suggestion extracted from OpenRouter response');
      return '';
    }
    if (mode === 'word' && !currentText.endsWith(' ')) {
      return content;
    }
    logger.info(`Generated OpenRouter suggestion (${model})`);
    return content.startsWith(' ') ? content : ' ' + content;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      logger.error('OpenRouter request timed out');
    } else {
      logger.error('OpenRouter generation failed');
    }
    return '';
  } finally {
    clearTimeout(timeoutId);
  }
}

// packages/shared/atlascloud.ts
import OpenAI3 from 'openai';
function getAtlasCloudClient() {
  const apiKey = process.env.ATLASCLOUD_API_KEY || '';
  if (!apiKey) {
    throw new Error(
      'ATLASCLOUD_API_KEY is not set. AtlasCloud requires an API key. Get one at https://www.atlascloud.ai/.'
    );
  }
  return new OpenAI3({
    apiKey,
    baseURL: 'https://api.atlascloud.ai/v1',
  });
}
async function generateTextCompletionAtlasCloud(
  currentText,
  mode = 'sentence',
  style = 'casual',
  model = 'dots-studio/dots-3-note-prev-free'
) {
  const client = getAtlasCloudClient();
  const systemPrompt = buildSystemPrompt(mode, style);
  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: currentText },
  ];
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3e4);
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

// packages/shared/gemini.ts
var ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

// apps/server/gemini.ts
async function testApiKey() {
  try {
    logger.info('Testing Gemini API key...');
    if (!process.env.GEMINI_API_KEY) {
      logger.warn('No Gemini API key set');
      return false;
    }
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      config: {
        systemInstruction: 'Respond with "ok"',
        temperature: 0,
        maxOutputTokens: 5,
      },
      contents: 'Hello world',
    });
    const result = !!response.text?.trim();
    console.log('Gemini test result:', result);
    return result;
  } catch {
    logger.error('Gemini test failed');
    return false;
  }
}
async function testSambaNovaApiKey() {
  try {
    logger.info('Testing SambaNova API key...');
    logger.debug('SambaNova API key present:', !!process.env.SAMBANOVA_API_KEY);
    if (!process.env.SAMBANOVA_API_KEY) {
      logger.warn('No SambaNova API key set');
      return false;
    }
    const result = await generateTextCompletionSambaNova(
      'Hello',
      'word',
      'casual'
    );
    const success = !!result?.trim();
    logger.info(`SambaNova test result: ${success}`);
    return success;
  } catch {
    logger.error('SambaNova test failed');
    return false;
  }
}
async function testOpenRouterApiKey() {
  try {
    logger.info('Testing OpenRouter API key...');
    if (!process.env.OPENROUTER_API_KEY) {
      logger.warn('No OpenRouter API key set');
      return false;
    }
    const result = await generateTextCompletionOpenRouter(
      'Hello',
      'word',
      'casual'
    );
    const success = !!result?.trim();
    logger.info(`OpenRouter test result: ${success}`);
    return success;
  } catch {
    logger.error('OpenRouter test failed');
    return false;
  }
}
async function testAtlasCloudApiKey() {
  try {
    logger.info('Testing AtlasCloud API key...');
    if (!process.env.ATLASCLOUD_API_KEY) {
      logger.warn('No AtlasCloud API key set');
      return false;
    }
    const result = await generateTextCompletionAtlasCloud(
      'Hello',
      'word',
      'casual'
    );
    const success = !!result?.trim();
    logger.info(`AtlasCloud test result: ${success}`);
    return success;
  } catch {
    logger.error('AtlasCloud test failed');
    return false;
  }
}

// apps/server/functions/status.ts
var STATUS_CACHE_TTL_MS = 6e4;
var statusCache = null;
function clearStatusCache() {
  statusCache = null;
}
async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  if (statusCache && statusCache.expires > Date.now()) {
    res.json(statusCache.data);
    return;
  }
  try {
    const hasGeminiKey = !!process.env.GEMINI_API_KEY;
    const hasSambaNovaKey = !!process.env.SAMBANOVA_API_KEY;
    const hasOpenRouterKey = !!process.env.OPENROUTER_API_KEY;
    const hasAtlasCloudKey = !!process.env.ATLASCLOUD_API_KEY;
    let geminiWorking = false;
    let sambaNovaWorking = false;
    let openRouterWorking = false;
    let atlasCloudWorking = false;
    const skipGemini = process.env.DISABLE_GEMINI === 'true';
    if (hasGeminiKey && !skipGemini) {
      geminiWorking = await testApiKey();
    }
    if (hasSambaNovaKey) {
      sambaNovaWorking = await testSambaNovaApiKey();
    }
    if (hasOpenRouterKey) {
      openRouterWorking = await testOpenRouterApiKey();
    }
    if (hasAtlasCloudKey) {
      atlasCloudWorking = await testAtlasCloudApiKey();
    }
    const isWorking =
      process.env.NODE_ENV === 'development'
        ? true
        : geminiWorking ||
          sambaNovaWorking ||
          openRouterWorking ||
          atlasCloudWorking;
    const payload = {
      status: isWorking ? 'ok' : 'error',
      providers: {
        gemini: geminiWorking,
        sambanova: sambaNovaWorking,
        openrouter: openRouterWorking,
        atlascloud: atlasCloudWorking,
      },
    };
    statusCache = { data: payload, expires: Date.now() + STATUS_CACHE_TTL_MS };
    res.json(payload);
  } catch {
    console.error('Status check error');
    res.status(500).json({ status: 'error' });
  }
}
export { clearStatusCache, handler as default };
