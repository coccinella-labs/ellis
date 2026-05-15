# Autofix API

The server exposes a small HTTP API for text completion.

## POST /api/complete

Returns a suggestion for the given text.

Request:

```json
{
  "text": "The future of AI is",
  "mode": "sentence",
  "style": "technical",
  "provider": "auto",
  "geminiModel": "gemini-3-pro-preview"
}
```

Fields:

`text` is required.

`mode` may be `word`, `sentence`, or `paragraph`. The default is `sentence`.

`style` may be `casual`, `formal`, `creative`, or `technical`. The default is
`casual`.

`provider` may be `auto`, `gemini`, or `sambanova`. The default is `auto`.

`geminiApiKey` and `sambaNovaApiKey` may be sent per request. If omitted, the
server uses environment variables.

Response:

```json
{
  "suggestion": "..."
}
```

If `text` is shorter than 10 characters, the server returns an empty
suggestion.

## GET /api/status

Returns provider status.

Response:

```json
{
  "status": "ok",
  "providers": {
    "gemini": true,
    "sambanova": true
  }
}
```

In development, `status` can be `ok` even when no provider is ready. In
production, at least one provider must work for `status` to be `ok`.

## Environment

```sh
GEMINI_API_KEY=your_gemini_key
SAMBANOVA_API_KEY=your_sambanova_key
```

`DISABLE_GEMINI=true` skips the Gemini status check.
