# Ellis API

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
  "geminiModel": "gemini-3.8-flash"
}
```

Fields:

`text` is required.

`mode` may be `word`, `sentence`, or `paragraph`. The default is `sentence`.

`style` may be `casual`, `formal`, `creative`, or `technical`. The default is
`casual`.

`provider` may be `auto`, `gemini`, `sambanova`, `openrouter`, or `atlascloud`. The default is `auto`.

API keys are not accepted per request; the server uses environment variables
only.

Response:

```json
{
  "suggestion": "..."
}
```

If `text` is shorter than 10 characters, the server returns an empty
suggestion.

## GET /api/health

Returns a simple health check.

Response:

```json
{
  "status": "ok"
}
```

## GET /api/status

Returns provider status.

Response:

```json
{
  "status": "ok",
  "providers": {
    "gemini": true,
    "sambanova": true,
    "openrouter": true,
    "atlascloud": false
  }
}
```

In development, `status` can be `ok` even when no provider is ready. In
production, at least one provider must work for `status` to be `ok`.

Each configured provider is probed with one minimal completion request. The
providers do not offer an authenticated, quota-free key-check endpoint
(AtlasCloud's model listing is public and does not validate credentials), so a
completion is the only supported way to confirm a key works. Results are cached
for 60 seconds by both the Express server and the serverless handler; repeated
status requests inside that window reuse the cached result instead of issuing
new completion requests.

## Environment

```sh
GEMINI_API_KEY=your_gemini_key
SAMBANOVA_API_KEY=your_sambanova_key
OPENROUTER_API_KEY=your_openrouter_key
ATLASCLOUD_API_KEY=your_atlascloud_key
```

`DISABLE_GEMINI=true` skips the Gemini status check.
