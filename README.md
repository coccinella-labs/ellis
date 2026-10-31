<p align="center">
  <img src="https://raw.githubusercontent.com/coccinella-labs/hautofix/main/.github/assets/thumbnail.png" alt="hautofix" width="100%">
</p>

# hautofix

hautofix is an AI-powered text editor that ships as both a web application and a command-line tool. It offers inline AI text completion as you type: suggestions appear as ghost text over your writing, and you press Tab to accept one or Escape to dismiss it. Completions can be generated at three granularities, word, sentence, or paragraph, and in four writing styles, casual, formal, creative, or technical. Mode and style are independent, so a technical paragraph or a casual sentence can be requested without changing anything else about the setup.

The web app is a React single-page application with dark and light themes, a settings panel, and keyboard shortcuts. It runs on an Express server with Vite handling the frontend build and development experience. The CLI provides the same editing idea for headless workflows through the `fx` command: start a fresh document with `fx new --mode sentence --style casual`, or open an existing file with `fx edit draft.txt --mode paragraph --style technical`. Both interfaces require a Gemini API key.

Google Gemini is the primary AI provider, with the models gemini-3.8-flash, gemini-2.5-pro, gemini-2.5-flash, and gemini-2.5-flash-lite available. SambaNova is the fallback provider, running gpt-oss-120b. In auto mode, hautofix tries Gemini first and falls back to SambaNova when Gemini hits a rate limit or returns an error, so a transient failure on the primary provider does not interrupt the writing session.

To get started, clone the repository with `git clone https://github.com/coccinella-labs/hautofix`, move into the directory, copy `.env.example` to `.env`, and add your `GEMINI_API_KEY`. Run `npm install` to fetch dependencies, then `npm run dev` to start the development server, and open `http://localhost:3000`. Suggestions appear after you pause for 500 milliseconds, so the editor stays out of the way while you are actively writing and only offers help when you stop.

Configuration is handled through environment variables. `GEMINI_API_KEY` is required. `SAMBANOVA_API_KEY` enables the fallback provider. `DATABASE_URL` points at a PostgreSQL database used by Drizzle ORM for persistence. `PORT` overrides the default server port of 3000.

The project is written in TypeScript. The frontend uses React 18, Vite 7, Tailwind CSS 3, and Radix UI. The backend is Express 4. Persistence uses Drizzle ORM over PostgreSQL. The CLI is built with Commander.js. Testing uses Vitest for unit tests and Playwright for browser tests. Docker and Vercel deployment are supported. Useful scripts include `npm run dev`, `npm run build`, `npm run build:cli`, `npm run check` for type checking, `npm run lint`, `npm test`, and `npm run test:e2e`.

Fork the repository, create a feature branch, and run the app locally with `npm run dev` to try a change. Because the web app and CLI share the same completion behavior, changes to modes, styles, or provider handling should be checked in both interfaces. Add or update Vitest and Playwright tests alongside your change, and describe in your pull request which mode, style, and provider path you exercised.

Suggestions depend on a network call to an AI provider, so the editor needs connectivity and a valid API key to be useful. Fallback only triggers on rate limits or errors, which means a slow response from Gemini is not the same as a failure and will not by itself switch providers. The CLI is a terminal editor intended for headless and lightweight workflows, not a full replacement for the web interface's settings panel and theming.

Reusable parts of this repository include the shared package at packages/shared, which contains Zod schemas, prompt builders, a logger, and Gemini and SambaNova client wrappers. For example:

```ts
import { textCompletionRequestSchema } from '@shared/schema';
import { logger } from '@shared/logger';
import { generateTextCompletion } from '@shared/gemini';
```

The relaxed commit-msg hook in scripts/commit-msg together with the commitlint configuration, and the README structure adapted from the palmshed sandbox template, are also reusable. The rest of the codebase is application-specific. Licensed under MIT. See [LICENSE](LICENSE).
