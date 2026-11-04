# Shared package

This package holds code used by the server, client, and tests.

It contains the request and response schemas, prompt helpers, provider helpers,
and logger.

## Main files

`schema.ts` defines the text completion request and response shapes.

`prompts.ts` builds prompts from the selected mode and style.

`gemini.ts` calls Gemini and can fall back to SambaNova and OpenRouter when
configured.

`sambanova.ts` calls SambaNova.

`openrouter.ts` calls OpenRouter through its OpenAI-compatible API.

`logger.ts` provides shared logging.

## Tests

Run tests from the repo root:

```sh
npm run test
```

## Usage

This package is consumed through the `@shared` alias configured in
`vite.config.ts` and `tsconfig.json`; it is not independently installable.
Import individual modules, for example:

```ts
import { textCompletionRequestSchema } from '@shared/schema';
import { logger } from '@shared/logger';
import { generateTextCompletion } from '@shared/gemini';
```

## License

MIT.
