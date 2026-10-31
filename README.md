<p align="center">
  <img src="https://raw.githubusercontent.com/coccinella-labs/hautofix/main/.github/assets/thumbnail.png" alt="hautofix" width="100%">
</p>

# hautofix

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-22.x-339933.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg)](https://www.typescriptlang.org/)

AI-powered inline text completion for the web and the command line. hautofix suggests completions as ghost text as you type; press Tab to accept or Esc to dismiss. Completions can be generated at word, sentence, or paragraph granularity, in casual, formal, creative, or technical styles. Mode and style are independent.

## Features

- Inline ghost-text completion with Tab to accept and Esc to dismiss.
- Three completion granularities: word, sentence, paragraph.
- Four writing styles: casual, formal, creative, technical.
- Dual interface: React single-page web app and a terminal-based CLI.
- Provider fallback: Google Gemini (primary) with SambaNova fallback on rate limits or errors.
- Dark and light themes, settings panel, keyboard shortcuts.
- PostgreSQL persistence via Drizzle ORM; Docker and Vercel deployment support.

## Getting Started

### Prerequisites

- Node.js 22.x
- npm
- A Gemini API key (`GEMINI_API_KEY`)
- Optional: SambaNova API key (`SAMBANOVA_API_KEY`) for fallback
- Optional: PostgreSQL database (`DATABASE_URL`) for persistence

### Installation

```sh
git clone https://github.com/coccinella-labs/hautofix
cd hautofix
cp .env.example .env
# Edit .env and set GEMINI_API_KEY (and optional keys)
npm install
```

### Run (web app)

```sh
npm run dev
```

Open `http://localhost:3000`.

### Run (CLI)

```sh
cd apps/cli
npm install
npm run build
# or: npm run dev
fx new --mode sentence --style casual
fx edit draft.txt --mode paragraph --style technical
```

The CLI requires `GEMINI_API_KEY` in `.env`.

## Configuration

Environment variables (see `.env.example`):

| Variable            | Required | Description                                  |
| ------------------- | -------- | -------------------------------------------- |
| `GEMINI_API_KEY`    | Yes      | Google Gemini API key (primary provider)     |
| `SAMBANOVA_API_KEY` | No       | SambaNova API key (fallback provider)        |
| `DATABASE_URL`      | No       | PostgreSQL connection string for Drizzle ORM |
| `PORT`              | No       | Server port (default 3000)                   |

## AI Providers

| Provider      | Role     | Models                                                                        |
| ------------- | -------- | ----------------------------------------------------------------------------- |
| Google Gemini | Primary  | gemini-3-pro-preview, gemini-2.5-pro, gemini-2.5-flash, gemini-2.5-flash-lite |
| SambaNova     | Fallback | gpt-oss-120b                                                                  |

In auto mode, hautofix tries Gemini first and falls back to SambaNova on rate limits or errors.

## Tech Stack

- **Language:** TypeScript
- **Frontend:** React 18, Vite 7, Tailwind CSS 3, Radix UI
- **Backend:** Express 4, Drizzle ORM, PostgreSQL (Neon serverless)
- **CLI:** Commander.js
- **Testing:** Vitest (unit), Playwright (e2e)
- **Tooling:** Docker, Vercel, ESLint, Prettier, Husky

## Scripts

| Script              | Description                                             |
| ------------------- | ------------------------------------------------------- |
| `npm run dev`       | Start development server                                |
| `npm run build`     | Build client and server                                 |
| `npm run build:cli` | Build CLI                                               |
| `npm run check`     | TypeScript type check                                   |
| `npm run lint`      | Run ESLint                                              |
| `npm test`          | Run unit tests                                          |
| `npm run test:e2e`  | Run Playwright e2e tests                                |
| `npm run preflight` | Format, lint, type check, duplicate check, tests, build |

## Development

Fork the repository, create a feature branch, and run `npm run dev` to try changes. Because the web app and CLI share completion behavior, changes to modes, styles, or provider handling should be checked in both interfaces. Add or update Vitest and Playwright tests alongside your change.

## Known Limitations

- Suggestions require network access and a valid API key.
- Fallback triggers only on rate limits or errors; a slow Gemini response does not switch providers.
- The CLI is intended for headless and lightweight workflows, not a full replacement for the web settings panel and theming.

## License

MIT. See [LICENSE](LICENSE).
