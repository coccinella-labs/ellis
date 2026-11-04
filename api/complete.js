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
  return new OpenAI({
    apiKey: process.env.SAMBANOVA_API_KEY || '',
    baseURL: 'https://api.sambanova.ai/v1',
  });
}
async function generateTextCompletionSambaNova(
  currentText,
  mode = 'sentence',
  style = 'casual'
) {
  const client = getSambaNovaClient();
  try {
    const systemPrompt = buildSystemPrompt(mode, style);
    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: currentText },
    ];
    const response = await Promise.race([
      client.chat.completions.create({
        model: 'gpt-oss-120b',
        messages,
        max_tokens: mode === 'word' ? 10 : mode === 'sentence' ? 50 : 150,
        temperature: 0.7,
        stream: false,
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('sambanova timeout')), 3e4)
      ),
    ]);
    const content = response.choices[0]?.message?.content?.trim() || '';
    const suggestion = content;
    if (!suggestion) {
      console.log('No suggestion extracted from SambaNova response');
      return '';
    }
    if (mode === 'word' && !currentText.endsWith(' ')) {
      return suggestion;
    }
    logger.info(`Generated SambaNova suggestion: ${suggestion}`);
    return suggestion.startsWith(' ') ? suggestion : ' ' + suggestion;
  } catch {
    logger.error('SambaNova generation failed');
    return '';
  }
}

// packages/shared/gemini.ts
var ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
async function generateTextCompletion(
  currentText,
  mode = 'sentence',
  style = 'casual',
  provider = 'auto',
  geminiModel = 'gemini-3.8-flash'
) {
  logger.info(`Generating text completion with ${provider} (${geminiModel})`);
  const geminiClient = ai;
  if (provider === 'sambanova') {
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
    try {
      const systemPrompt = buildSystemPrompt(mode, style);
      const model = geminiModel;
      const response = await Promise.race([
        geminiClient.models.generateContent({
          model,
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.7,
            maxOutputTokens:
              mode === 'word' ? 10 : mode === 'sentence' ? 50 : 150,
          },
          contents: currentText,
        }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('gemini timeout')), 3e4)
        ),
      ]);
      const suggestion = response.text?.trim() || '';
      if (!suggestion) {
        return '';
      }
      if (mode === 'word' && !currentText.endsWith(' ')) {
        return suggestion;
      }
      logger.info(`Generated Gemini suggestion (${model}): ${suggestion}`);
      return ' ' + suggestion;
    } catch {
      logger.error('Gemini generation failed');
      return '';
    }
  }
  const hasGeminiKey = !!process.env.GEMINI_API_KEY;
  if (!hasGeminiKey) {
    logger.info('No Gemini API key, using SambaNova directly');
    try {
      const suggestion = await generateTextCompletionSambaNova(
        currentText,
        mode,
        style
      );
      if (suggestion) {
        logger.info('Generated SambaNova suggestion (direct)');
        return suggestion;
      }
    } catch {
      logger.error('SambaNova generation failed');
    }
    return '';
  }
  try {
    const systemPrompt = buildSystemPrompt(mode, style);
    const model = geminiModel;
    const response = await Promise.race([
      geminiClient.models.generateContent({
        model,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7,
          maxOutputTokens:
            mode === 'word' ? 10 : mode === 'sentence' ? 50 : 150,
        },
        contents: currentText,
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('gemini timeout')), 3e4)
      ),
    ]);
    const suggestion = response.text?.trim() || '';
    if (!suggestion) {
      return '';
    }
    if (mode === 'word' && !currentText.endsWith(' ')) {
      return suggestion;
    }
    logger.info(`Generated Gemini suggestion (${model}): ${suggestion}`);
    return ' ' + suggestion;
  } catch (error) {
    logger.error('Gemini generation failed');
    if (
      error?.status === 429 ||
      error?.message?.includes('quota') ||
      error?.message?.includes('RESOURCE_EXHAUSTED')
    ) {
      logger.warn('Rate limit hit, falling back to SambaNova...');
      try {
        const fallbackSuggestion = await generateTextCompletionSambaNova(
          currentText,
          mode,
          style
        );
        if (fallbackSuggestion) {
          logger.info('Successfully used SambaNova fallback');
          return fallbackSuggestion;
        }
      } catch {
        logger.error('SambaNova fallback failed');
      }
    }
    return '';
  }
}

// packages/shared/schema.ts
import { sql } from 'drizzle-orm';
import { pgTable, text, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
var users = pgTable('users', {
  id: varchar('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  username: text('username').notNull().unique(),
  password: text('password').notNull(),
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});
var textCompletionRequestSchema = z.object({
  text: z.string(),
  mode: z.enum(['word', 'sentence', 'paragraph']).default('sentence'),
  style: z
    .enum(['casual', 'formal', 'creative', 'technical'])
    .default('casual'),
  provider: z.enum(['auto', 'gemini', 'sambanova']).default('auto'),
  geminiModel: z.string().default('gemini-3.8-flash'),
});
var textCompletionResponseSchema = z.object({
  suggestion: z.string(),
});

// apps/server/functions/complete.ts
var ratelimit = null;
var fallbackStore = null;
var WINDOW_MS = 6e4;
var MAX_REQUESTS = 30;
async function getRatelimit() {
  if (ratelimit) return ratelimit;
  const redisUrl = process.env.UPSTASH_REDIS_URL;
  if (redisUrl) {
    try {
      const { Ratelimit } = await import('@upstash/ratelimit');
      const { Redis } = await import('@upstash/redis');
      const redis = new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL || redisUrl,
        token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
      });
      ratelimit = new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(MAX_REQUESTS, `${WINDOW_MS} ms`),
        analytics: false,
      });
      return ratelimit;
    } catch (error) {
      console.error(
        'Failed to initialize Upstash ratelimit, using in-memory fallback:',
        error
      );
    }
  }
  fallbackStore = /* @__PURE__ */ new Map();
  return null;
}
function isRateLimitedFallback(ip) {
  if (!fallbackStore) return false;
  const now = Date.now();
  const entry = fallbackStore.get(ip);
  if (!entry || now > entry.resetAt) {
    fallbackStore.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_REQUESTS;
}
async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  const ip =
    req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown';
  const limiter = await getRatelimit();
  if (limiter) {
    const { success } = await limiter.limit(ip);
    if (!success) {
      res.status(429).json({ error: 'Too many requests' });
      return;
    }
  } else if (isRateLimitedFallback(ip)) {
    res.status(429).json({ error: 'Too many requests' });
    return;
  }
  try {
    const {
      text: text2,
      mode,
      style,
      provider,
      geminiModel,
    } = textCompletionRequestSchema.parse(req.body);
    if (!text2 || text2.length < 10) {
      res.json({ suggestion: '' });
      return;
    }
    const suggestion = await generateTextCompletion(
      text2,
      mode,
      style,
      provider,
      geminiModel
    );
    res.json({ suggestion });
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return res.status(400).json({ suggestion: '' });
    }
    console.error('API error:', error);
    res.status(500).json({ suggestion: '' });
  }
}
export { handler as default };
