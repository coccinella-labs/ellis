<p align="center">
  <img src="https://raw.githubusercontent.com/coccinella-labs/hautofix/main/.github/assets/thumbnail.png" alt="hautofix" width="100%">
</p>

# hautofix (`coccinella-labs/hautofix`)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-22.x-339933.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-5.x-3178C6.svg)](https://www.typescriptlang.org/)
[![Tests](https://img.shields.io/badge/tests-vitest-brightgreen.svg)](https://vitest.dev/)

> AI-powered inline text completion for the web and the command line.

hautofix provides inline AI text completion as you type. Suggestions appear as ghost text over your writing; press Tab to accept or Esc to dismiss. Completions can be generated at word, sentence, or paragraph granularity, in casual, formal, creative, or technical styles. Mode and style are independent.

---

## Current Status & Stability Expectations

- **Version**: `1.0.0`
- **Stability**: Stable for local and single-user use. The completion contract (modes, styles, provider fallback) is documented below and changes follow semantic versioning.
- **Providers**: Google Gemini (primary) with SambaNova fallback. Network access and a valid `GEMINI_API_KEY` are required for suggestions.
- **Storage**: PostgreSQL via Drizzle ORM when `DATABASE_URL` is set; in-memory otherwise.

---

## Architecture

1. **Web app** (`apps/client`): React 18 SPA with Vite 7, Tailwind CSS 3, Radix UI.
2. **Server** (`apps/server`): Express 4 API exposing `/api/status` and `/api/complete`, with Vite middleware in development.
3. **CLI** (`apps/cli`): Commander.js terminal editor published as `fx`.
4. **Shared** (`packages/shared`): Zod schemas, prompts, Gemini/SambaNova clients, logger.
5. **Persistence** (`packages/shared/schema.ts`): Drizzle ORM schema for PostgreSQL.

---

## Installation

```sh
git clone https://github.com/coccinella-labs/hautofix
cd hautofix
cp .env.example .env
# Set GEMINI_API_KEY (and optional keys) in .env
npm install
```

---

## Quickstart

Web app:

```sh
npm run dev
```

Open `http://localhost:3000`.

CLI:

```sh
cd apps/cli
npm install
npm run build
fx new --mode sentence --style casual
fx edit draft.txt --mode paragraph --style technical
```

---

## Configuration

| Variable            | Required | Description                                  |
| ------------------- | -------- | -------------------------------------------- |
| `GEMINI_API_KEY`    | Yes      | Google Gemini API key (primary provider)     |
| `SAMBANOVA_API_KEY` | No       | SambaNova API key (fallback provider)        |
| `DATABASE_URL`      | No       | PostgreSQL connection string for Drizzle ORM |
| `PORT`              | No       | Server port (default 3000)                   |

---

## AI Providers

| Provider      | Role     | Models                                                                        |
| ------------- | -------- | ----------------------------------------------------------------------------- |
| Google Gemini | Primary  | gemini-3-pro-preview, gemini-2.5-pro, gemini-2.5-flash, gemini-2.5-flash-lite |
| SambaNova     | Fallback | gpt-oss-120b                                                                  |

In auto mode, hautofix tries Gemini first and falls back to SambaNova on rate limits or errors.

---

## Development & Verification

The repository uses a shared preflight pipeline (same as CI):

- `npm run preflight:quick` is not defined; use `npm run dev` for fast feedback.
- `npm run preflight` - full deterministic gate: format, lint, type check, duplicate check, tests, coverage, build.
- `npm run test:e2e` - Playwright end-to-end tests.

Run the unit tests with `npm test` and the type check with `npm run check`.

---

## Debug Logging

Set `DEBUG` or inspect server logs. The server logs request method, path, status, and duration for `/api` routes.

---

## Known Limitations

- Suggestions require network access and a valid API key.
- Fallback triggers only on rate limits or errors; a slow Gemini response does not switch providers.
- The CLI is intended for headless and lightweight workflows, not a full replacement for the web settings panel and theming.

---

## License

MIT. See [LICENSE](LICENSE).
