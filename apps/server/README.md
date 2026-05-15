# Autofix server

This app provides the HTTP API used by the web editor.

It is an Express server written in TypeScript. It exposes text completion and
provider status routes.

## Run

From the repo root:

```sh
npm run dev
```

For production:

```sh
npm run build
npm start
```

## Environment

Set at least one provider key before asking for completions.

```sh
GEMINI_API_KEY=your_gemini_key
SAMBANOVA_API_KEY=your_sambanova_key
```

`GEMINI_API_KEY` is used for Gemini. `SAMBANOVA_API_KEY` is used for
SambaNova fallback.

Set `DISABLE_GEMINI=true` to skip the Gemini status check.

## Routes

`POST /api/complete` returns a text suggestion.

```json
{
  "text": "The future of AI is",
  "mode": "sentence",
  "style": "technical",
  "provider": "auto",
  "geminiModel": "gemini-3-pro-preview"
}
```

```json
{
  "suggestion": "..."
}
```

`GET /api/status` returns provider status.

```json
{
  "status": "ok",
  "providers": {
    "gemini": true,
    "sambanova": true
  }
}
```

## Docker

Build and run the server image from the repo root:

```sh
docker build -t autofix-server .
docker run -p 3001:3001 \
  -e GEMINI_API_KEY=your_key \
  -e SAMBANOVA_API_KEY=your_key \
  autofix-server
```

## License

MIT.
