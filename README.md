<p align="center">
  <img src="https://raw.githubusercontent.com/Coccinella-Labs/hautofix/main/.github/assets/thumbnail.png" alt="hautofix" width="100%">
</p>

# autofix

autofix is an AI-powered text editor that ships as both a web app and a command-line tool. It is part of the [palmshed](https://github.com/palmshed) stack, built on vortai and thread, and uses mlapi for execution.

## What It Does

autofix offers inline AI text completion as you type. Suggestions appear as ghost text overlaid on your writing, and you press Tab to accept one or Esc to dismiss it. Completions can be generated at three granularities, word, sentence, or paragraph, and in four writing styles: casual, formal, creative, or technical. Mode and style are independent, so you can ask for a technical paragraph or a casual sentence without changing anything else about your setup.

## Getting Started

Clone the repository with `git clone https://github.com/palmshed/hautofix` and move into the directory. Copy `.env.example` to `.env` and add your `GEMINI_API_KEY`, since Gemini is the primary provider and the app will not produce suggestions without it. Run `npm install` to fetch dependencies, then `npm run dev` to start the development server. Open `http://localhost:3000` and start typing. Suggestions appear after you pause for 500 milliseconds, so the editor stays out of the way while you are actively writing and only offers help when you stop.

## Interfaces

The web app is a React single-page application with a dark and light theme, a settings panel, and keyboard shortcuts. It runs on an Express server with Vite handling the frontend build and dev experience. The CLI is the same editing idea for headless workflows: an `autofix` command that opens a terminal-based editor. Start a fresh document with `autofix new --mode sentence --style casual`, or open an existing file with `autofix edit draft.txt --mode paragraph --style technical`. The CLI also needs `GEMINI_API_KEY` set in `.env`.

## AI Providers

Google Gemini is the primary provider, with the models gemini-3-pro-preview, gemini-2.5-pro, gemini-2.5-flash, and gemini-2.5-flash-lite available. SambaNova is the fallback provider, running gpt-oss-120b. In auto mode, autofix tries Gemini first and falls back to SambaNova when Gemini hits a rate limit or returns an error, so a transient failure on the primary provider does not interrupt the writing session. If you want to use the fallback path, configure the SambaNova credentials alongside your Gemini key in `.env`, following the variable names in `.env.example`.

## Tech Stack

autofix is written in TypeScript. The frontend uses React 18, Vite 7, Tailwind CSS 3, and Radix UI components. The backend is Express 4, with Drizzle ORM over PostgreSQL for persistence. The CLI is built with Commander.js. Testing uses Vitest for unit tests and Playwright for browser tests. The project includes Docker support and is set up for deployment on Vercel.

## Contributing

Fork the repository, create a feature branch, and run the app locally with `npm run dev` to try your change. Because the web app and CLI share the same completion behavior, changes to modes, styles, or provider handling should be checked in both interfaces. Add or update Vitest and Playwright tests alongside your change, and describe in your pull request which mode, style, and provider path you exercised.

## Known Limitations

Suggestions depend on a network call to an AI provider, so the editor needs connectivity and a valid API key to be useful. Fallback only triggers on rate limits or errors, which means a slow response from Gemini is not the same as a failure and will not by itself switch providers. The CLI is a terminal editor intended for headless and lightweight workflows, not a full replacement for the web interface's settings panel and theming.

## Related Projects

autofix sits in the palmshed stack. It builds on vortai and thread and delegates execution to mlapi, so behavior changes in those projects can surface here.

## License

MIT.
