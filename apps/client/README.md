# Autofix client

This app is the web editor for Autofix.

It is a React and TypeScript app built with Vite. It sends text to the server
and shows completion suggestions in the editor.

## Run

From the repo root:

```sh
npm run dev
```

Open `http://localhost:3000`.

## What is here

The main editor page is in `src/pages/Editor.tsx`.

Editor controls live in `src/components`.

Writing settings live in `src/hooks/useWritingSettings.ts`.

The client calls `POST /api/complete` for suggestions.

## Build

From the repo root:

```sh
npm run build
```

## License

MIT.
