// apps/server/index.ts
import 'dotenv/config';
import express2 from 'express';
import { createServer } from 'http';

// apps/server/routes.ts
import rateLimit from 'express-rate-limit';

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
        logger.info('Generated SambaNova suggestion');
        return suggestion;
      }
    } catch {
      logger.error('SambaNova generation failed');
    }
    return '';
  }
  if (provider === 'openrouter') {
    try {
      const suggestion = await generateTextCompletionOpenRouter(
        currentText,
        mode,
        style
      );
      if (suggestion) {
        logger.info('Generated OpenRouter suggestion');
        return suggestion;
      }
    } catch {
      logger.error('OpenRouter generation failed');
    }
    return '';
  }
  if (provider === 'atlascloud') {
    try {
      const suggestion = await generateTextCompletionAtlasCloud(
        currentText,
        mode,
        style
      );
      if (suggestion) {
        logger.info('Generated AtlasCloud suggestion');
        return suggestion;
      }
    } catch {
      logger.error('AtlasCloud generation failed');
    }
    return '';
  }
  if (provider === 'gemini') {
    try {
      const systemPrompt = buildSystemPrompt(mode, style);
      const model = geminiModel;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3e4);
      try {
        const response = await geminiClient.models.generateContent({
          model,
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.7,
            maxOutputTokens:
              mode === 'word' ? 10 : mode === 'sentence' ? 50 : 150,
            abortSignal: controller.signal,
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
        logger.info(`Generated Gemini suggestion (${model})`);
        return ' ' + suggestion;
      } finally {
        clearTimeout(timeoutId);
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        logger.error('Gemini request timed out');
      } else {
        logger.error('Gemini generation failed');
      }
      return '';
    }
  }
  const hasGeminiKey = !!process.env.GEMINI_API_KEY;
  if (!hasGeminiKey) {
    logger.info('No Gemini API key, trying SambaNova then OpenRouter');
    return tryFallbackChain(currentText, mode, style);
  }
  try {
    const systemPrompt = buildSystemPrompt(mode, style);
    const model = geminiModel;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3e4);
    try {
      const response = await geminiClient.models.generateContent({
        model,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7,
          maxOutputTokens:
            mode === 'word' ? 10 : mode === 'sentence' ? 50 : 150,
          abortSignal: controller.signal,
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
      logger.info(`Generated Gemini suggestion (${model})`);
      return ' ' + suggestion;
    } finally {
      clearTimeout(timeoutId);
    }
  } catch (error) {
    logger.error('Gemini generation failed');
    const status = error.status;
    const message = error instanceof Error ? error.message : String(error);
    if (
      status === 429 ||
      message.includes('quota') ||
      message.includes('RESOURCE_EXHAUSTED')
    ) {
      logger.warn(
        'Rate limit hit, falling back to SambaNova then OpenRouter...'
      );
      return tryFallbackChain(currentText, mode, style);
    }
    return '';
  }
}
async function tryFallbackChain(currentText, mode, style) {
  try {
    const suggestion = await generateTextCompletionSambaNova(
      currentText,
      mode,
      style
    );
    if (suggestion) {
      logger.info('Successfully used SambaNova fallback');
      return suggestion;
    }
  } catch {
    logger.error('SambaNova fallback failed');
  }
  try {
    const suggestion = await generateTextCompletionOpenRouter(
      currentText,
      mode,
      style
    );
    if (suggestion) {
      logger.info('Successfully used OpenRouter fallback');
      return suggestion;
    }
  } catch {
    logger.error('OpenRouter fallback failed');
  }
  return '';
}

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
  provider: z
    .enum(['auto', 'gemini', 'sambanova', 'openrouter', 'atlascloud'])
    .default('auto'),
  geminiModel: z.string().default('gemini-3.8-flash'),
});
var textCompletionResponseSchema = z.object({
  suggestion: z.string(),
});

// apps/server/routes.ts
var completeLimiter = rateLimit({
  windowMs: 60 * 1e3,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
});
var statusLimiter = rateLimit({
  windowMs: 60 * 1e3,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
});
var statusCache = null;
function registerRoutes(app2) {
  app2.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
  });
  app2.get('/api/status', statusLimiter, async (req, res) => {
    if (statusCache && statusCache.expires > Date.now()) {
      return res.json(statusCache.data);
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
      logger.info(
        `Status check result - Gemini: ${geminiWorking}, SambaNova: ${sambaNovaWorking}, OpenRouter: ${openRouterWorking}, AtlasCloud: ${atlasCloudWorking}`
      );
      const payload = {
        status: isWorking ? 'ok' : 'error',
        providers: {
          gemini: geminiWorking,
          sambanova: sambaNovaWorking,
          openrouter: openRouterWorking,
          atlascloud: atlasCloudWorking,
        },
      };
      statusCache = { data: payload, expires: Date.now() + 6e4 };
      res.json(payload);
    } catch {
      logger.error('Status check failed');
      res.status(500).json({ status: 'error' });
    }
  });
  app2.post('/api/complete', completeLimiter, async (req, res) => {
    try {
      const {
        text: text2,
        mode,
        style,
        provider,
        geminiModel,
      } = textCompletionRequestSchema.parse(req.body);
      if (!text2 || text2.length < 10) {
        return res.json({ suggestion: '' });
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
      logger.error('API error');
      res.status(500).json({ suggestion: '' });
    }
  });
  return app2;
}

// apps/server/vite.ts
import express from 'express';
import fs from 'fs';
import path2 from 'path';
import { createServer as createViteServer, createLogger } from 'vite';

// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import runtimeErrorOverlay from '@replit/vite-plugin-runtime-error-modal';
var __dirname = path.dirname(fileURLToPath(import.meta.url));
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    {
      name: 'suppress-postcss-warning',
      configureServer() {
        const originalWarn = console.warn;
        console.warn = (message, ...args) => {
          if (
            typeof message === 'string' &&
            message.includes('PostCSS plugin did not pass the `from` option')
          ) {
            return;
          }
          originalWarn(message, ...args);
        };
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'apps/client/src'),
      '@shared': path.resolve(__dirname, 'packages/shared'),
      '@assets': path.resolve(__dirname, 'attached_assets'),
    },
  },
  root: 'apps/client',
  publicDir: 'public',
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, 'apps/client/index.html'),
    },
  },
  server: {
    fs: {
      strict: true,
      deny: ['**/.*'],
    },
  },
});

// apps/server/vite.ts
import { nanoid } from 'nanoid';
import rateLimit2 from 'express-rate-limit';
var viteLogger = createLogger();
function log(message, source = 'express') {
  const formattedTime = /* @__PURE__ */ new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true,
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: serverOptions,
    appType: 'custom',
  });
  app2.use(vite.middlewares);
  const viteRateLimiter = rateLimit2({
    windowMs: 15 * 60 * 1e3,
    // 15 minutes
    max: 100,
    // limit each IP to 100 requests per windowMs
    standardHeaders: true,
    // Return rate limit info in the RateLimit-* headers
    legacyHeaders: false,
    // Disable the X-RateLimit-* headers
  });
  app2.use('*', viteRateLimiter, async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        '../..',
        'apps/client',
        'index.html'
      );
      let template = await fs.promises.readFile(clientTemplate, 'utf-8');
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ 'Content-Type': 'text/html' }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, 'public');
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  const staticRateLimiter = rateLimit2({
    windowMs: 15 * 60 * 1e3,
    // 15 minutes
    max: 100,
    // limit each IP to 100 requests per windowMs
    standardHeaders: true,
    // Return rate limit info in the RateLimit-* headers
    legacyHeaders: false,
    // Disable the X-RateLimit-* headers
  });
  app2.use('*', staticRateLimiter, (_req, res) => {
    res.sendFile(path2.resolve(distPath, 'index.html'));
  });
}

// apps/server/index.ts
var app = express2();
app.use(express2.json({ limit: '1mb' }));
app.use(express2.urlencoded({ extended: false, limit: '1mb' }));
function sanitizeForLog(input) {
  return input.replace(/[\n\r]/g, '');
}
function requestLogger(req, res, next) {
  const start = Date.now();
  const path3 = sanitizeForLog(req.path);
  const originalResJson = res.json;
  res.json = function (bodyJson) {
    return originalResJson.call(res, bodyJson);
  };
  res.on('finish', () => {
    const duration = Date.now() - start;
    if (path3.startsWith('/api')) {
      const logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      log(logLine);
    }
  });
  next();
}
app.use(requestLogger);
var configuredApp = registerRoutes(app);
function errorHandler(err, _req, res, _next) {
  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({ message });
}
configuredApp.use(errorHandler);
if (configuredApp.get('env') === 'development') {
  const server = createServer(configuredApp);
  setupVite(configuredApp, server);
  const port = parseInt(process.env.PORT || '3000', 10);
  server.listen(
    {
      port,
      host: '0.0.0.0',
    },
    () => {
      log(`serving on port ${port}`);
    }
  );
} else {
  serveStatic(configuredApp);
  if (!process.env.VERCEL) {
    const server = createServer(configuredApp);
    const port = parseInt(process.env.PORT || '3000', 10);
    server.listen(
      {
        port,
        host: '0.0.0.0',
      },
      () => {
        log(`serving on port ${port}`);
      }
    );
  }
}
if (typeof process !== 'undefined' && !process.env.VERCEL) {
  const shutdown = () => {
    log('Shutting down gracefully');
    process.exit(0);
  };
  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}
var index_default = configuredApp;
export {
  index_default as default,
  errorHandler,
  requestLogger,
  sanitizeForLog,
};
