# Shared package

Internal shared code for the Ellis web app, server, CLI, and tests. It is
consumed through the `@shared` alias configured in `vite.config.ts` and
`tsconfig.json`; it is not independently installable or published.

## Public surface

| Module          | Exports                                                                                    | Consumers                 |
| --------------- | ------------------------------------------------------------------------------------------ | ------------------------- |
| `schema.ts`     | `textCompletionRequestSchema`, `textCompletionResponseSchema`, `insertUserSchema`, `users` | server, client, tests     |
| `prompts.ts`    | `buildSystemPrompt`                                                                        | all providers             |
| `logger.ts`     | `logger`                                                                                   | server, providers, client |
| `gemini.ts`     | `ai`, `generateTextCompletion`                                                             | server, client            |
| `sambanova.ts`  | `generateTextCompletionSambaNova`                                                          | server                    |
| `openrouter.ts` | `generateTextCompletionOpenRouter`                                                         | server                    |

## Provider selection

`generateTextCompletion` accepts a `provider` argument:

- `auto` (default) — tries Gemini, then SambaNova, then OpenRouter.
- `gemini` — Gemini only, no fallback.
- `sambanova` — SambaNova only, no fallback.
- `openrouter` — OpenRouter only, no fallback.

Explicit selection never falls back. `auto` falls back only on rate-limit
or quota errors from Gemini; timeouts and other errors do not trigger
fallback.

## Fallback order

1. **Gemini** — `gemini-3.8-flash` (default) or `gemini-3.5-flash-lite`.
   Skipped when `GEMINI_API_KEY` is unset.
2. **SambaNova** — `gpt-oss-120b`. Skipped when `SAMBANOVA_API_KEY` is
   unset.
3. **OpenRouter** — `openrouter/free` (free auto-router). Skipped when
   `OPENROUTER_API_KEY` is unset.

Each provider throws when its API key is missing, so `auto` mode must have
at least one key configured to return a suggestion.

## Environment variables

| Variable                   | Required for  | Notes                                   |
| -------------------------- | ------------- | --------------------------------------- |
| `GEMINI_API_KEY`           | Gemini        | Default provider                        |
| `SAMBANOVA_API_KEY`        | SambaNova     | Fallback                                |
| `OPENROUTER_API_KEY`       | OpenRouter    | Required even for free models           |
| `UPSTASH_REDIS_REST_URL`   | rate limiting | Both URL and token needed               |
| `UPSTASH_REDIS_REST_TOKEN` | rate limiting | Both URL and token needed               |
| `LOG_LEVEL`                | logger        | `error`, `warn`, `info`, `log`, `debug` |

## Defaults and timeouts

- Mode defaults to `sentence`, style to `casual`, provider to `auto`.
- Gemini model defaults to `gemini-3.8-flash`.
- Each provider request has a 30-second timeout via `AbortController`.
  The signal is passed to the SDK, so the underlying HTTP request is
  actually cancelled when the timeout fires; the timer is cleared in a
  `finally` block so it always runs, whether the request succeeds, fails,
  or times out.

## Failure handling

- A provider failure returns `''` for that provider. `auto` continues to
  the next provider; explicit selection returns `''`.
- The server returns an empty suggestion for text shorter than 10 characters
  and for Zod validation failures.
- Provider errors are logged through the shared logger as a safe category
  and provider name. The raw SDK error object is never forwarded, so no
  internal SDK details or user-generated content reach the console.

## Logging

The shared logger (`logger.ts`) writes timestamped, level-aware output to
the console. It supports a `LOG_LEVEL` environment variable and a structured
JSON mode. Provider helpers log provider name, model, and outcome only —
never the suggestion text or the user's input.

## Tests

Run from the repo root:

```sh
npm test
```

Tests mock provider responses and do not require live API credentials.

## License

MIT.
