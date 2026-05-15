# Contributing

Use Node.js 20 or later.

Install the repo and start the app:

```sh
npm install
npm run prepare
npm run dev
```

The app runs at `http://localhost:3000`.

Set provider keys in your shell or in a local `.env` file:

```sh
GEMINI_API_KEY=your_gemini_key
SAMBANOVA_API_KEY=your_sambanova_key
```

Before opening a pull request, run:

```sh
npm run preflight
npm run test:e2e
```

Keep commits focused. Update docs when behavior changes.
