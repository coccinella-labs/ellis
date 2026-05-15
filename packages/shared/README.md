# Shared package

This package holds code used by the server, client, and tests.

It contains the request and response schemas, prompt helpers, provider helpers,
and logger.

## Main files

`schema.ts` defines the text completion request and response shapes.

`prompts.ts` builds prompts from the selected mode and style.

`gemini.ts` calls Gemini and can fall back to SambaNova when configured.

`sambanova.ts` calls SambaNova.

`logger.ts` provides shared logging.

## Tests

Run tests from the repo root:

```sh
npm run test
```

## License

MIT.
