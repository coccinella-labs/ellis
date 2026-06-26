# autofix

**AI-powered text editor - web app + CLI.**

Part of the [palmshed](https://github.com/palmshed) stack. Built on vortai + thread. Uses mlapi for execution.

## What it does

Inline AI text completion as you type. Supports multiple modes (word, sentence, paragraph) and writing styles (casual, formal, creative, technical). Suggests completions via ghost text overlay - Tab to accept, Esc to dismiss.

## Interfaces

- **Web app** - React SPA with dark/light theme, settings panel, keyboard shortcuts. Runs on Express + Vite.
- **CLI** - `autofix` command. Terminal-based editor for headless workflows.

## AI providers

| Provider | Role | Model |
|----------|------|-------|
| Google Gemini | Primary | gemini-3-pro-preview, gemini-2.5-pro, gemini-2.5-flash, gemini-2.5-flash-lite |
| SambaNova | Fallback | gpt-oss-120b |

Auto mode tries Gemini first; falls back to SambaNova on rate limits or errors.

## Quick start

```sh
git clone https://github.com/palmshed/hautofix
cd hautofix
cp .env.example .env   # add GEMINI_API_KEY
npm install
npm run dev
```

Open `http://localhost:3000`. Start typing - suggestions appear after 500ms pause.

## CLI

```sh
autofix new --mode sentence --style casual
autofix edit draft.txt --mode paragraph --style technical
```

Requires `GEMINI_API_KEY` in `.env`.

## Tech

TypeScript · React 18 · Express 4 · Vite 7 · Tailwind CSS 3 · Radix UI · Drizzle ORM · PostgreSQL · Commander.js · Playwright · Vitest · Docker · Vercel

## License

MIT
