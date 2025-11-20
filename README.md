# Autofix

[![NPM version](https://img.shields.io/npm/v/@harpertoken/autofix-cli.svg)](https://npmjs.org/package/@harpertoken/autofix-cli) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/@harpertoken/autofix-cli)

AI-powered text completion platform with CLI tool, web editor, and Node.js server for seamless writing assistance.

The full API of this library can be found in [api.md](api.md).

## Installation

### CLI Tool (Recommended)

```sh
npm install -g @harpertoken/autofix-cli
```

### Full System (Development)

```sh
git clone https://github.com/harpertoken/autofix.git
cd autofix
npm install
npm run prepare
```

## Usage

### CLI Usage

```sh
# Basic completion
autofix "hello this is a"

# With custom style and mode
autofix "write a function to" --style technical --mode sentence
```

### Web Editor

```sh
npm run dev
# Open http://localhost:3000
```

### Request & Response types

This library includes TypeScript definitions for all request params and response fields. You may import and use them like so:

```typescript
// POST /api/complete
{
  "text": "hello this is a",
  "mode": "sentence",
  "style": "casual"
}

// Response
{
  "suggestion": " test of the AI completion system."
}
```

### Status Endpoint

```typescript
// GET /api/status
{
  "status": "ok",
  "providers": {
    "gemini": true,
    "sambanova": true
  }
}
```

## API Keys Setup

This tool requires AI provider API keys for text completion.

### Required: Google Gemini

1. Get a [Google Gemini API key](https://ai.google.dev/)
2. Set environment variable:
   ```sh
   export GEMINI_API_KEY=your_api_key_here
   ```

### Optional: SambaNova (Fallback)

1. Get a [SambaNova API key](https://sambanova.ai/)
2. Set environment variable:
   ```sh
   export SAMBANOVA_API_KEY=your_api_key_here
   ```

> [!NOTE]
> SambaNova provides automatic fallback when Gemini hits rate limits (200 requests/day free tier).

## Features

### CLI Editor

- Real-time AI text completion
- Multiple completion modes: word, sentence, paragraph
- Writing styles: casual, formal, creative, technical
- Auto-save functionality
- Keyboard shortcuts support

### Web Client

- Modern React-based interface
- Live text completion
- Settings panel with craft options
- Responsive design
- Welcome modal for new users

### Server & API

- RESTful API endpoints
- Dual AI provider support
- Automatic fallback system
- Request/response validation
- Error handling and logging

### Development

- TypeScript throughout
- Pre-commit hooks (Husky)
- Automated testing (Vitest + Playwright)
- Code formatting (Prettier)
- Semantic release automation

## AI Provider Fallback

Autofix uses a smart fallback system for maximum reliability:

1. **Primary**: Google Gemini 3.0 Pro Preview (latest model)
2. **Fallback**: SambaNova GPT-OSS-120B (when Gemini rate limited)

The system automatically detects rate limits and switches providers seamlessly.

### Rate Limit Handling

```typescript
// Automatic fallback on 429 errors
if (geminiError.status === 429) {
  return await sambaNovaFallback(text, mode, style);
}
```

## Handling errors

When the library is unable to connect to the API,
or if the API returns a non-success status code (i.e., 4xx or 5xx response),
a subclass of `APIError` will be thrown:

```typescript
const response = await client.search.recommend().catch(async (err) => {
  if (err instanceof Autofix.APIError) {
    console.log(err.status); // 400
    console.log(err.name); // BadRequestError
    console.log(err.headers); // {server: 'nginx', ...}
  } else {
    throw err;
  }
});
```

Error codes are as follows:

| Status Code | Error Type                 |
| ----------- | -------------------------- |
| 400         | `BadRequestError`          |
| 401         | `AuthenticationError`      |
| 403         | `PermissionDeniedError`    |
| 404         | `NotFoundError`            |
| 422         | `UnprocessableEntityError` |
| 429         | `RateLimitError`           |
| >=500       | `InternalServerError`      |
| N/A         | `APIConnectionError`       |

### Retries

Certain errors will be automatically retried 2 times by default, with a short exponential backoff.
Connection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,
429 Rate Limit, and >=500 Internal errors will all be retried by default.

You can use the `maxRetries` option to configure or disable this:

```typescript
// Configure the default for all requests:
const client = new Autofix({
  maxRetries: 0, // default is 2
});

// Or, configure per-request:
await client.complete({
  maxRetries: 5,
});
```

### Timeouts

Requests time out after 1 minute by default. You can configure this with a `timeout` option:

```typescript
// Configure the default for all requests:
const client = new Autofix({
  timeout: 20 * 1000, // 20 seconds (default is 1 minute)
});

// Override per-request:
await client.complete({
  timeout: 5 * 1000,
});
```

On timeout, an `APIConnectionTimeoutError` is thrown.

Note that requests which time out will be [retried twice by default](#retries).

## Advanced Usage

### Accessing raw Response data (e.g., headers)

The "raw" `Response` returned by `fetch()` can be accessed through the `.asResponse()` method on the `APIPromise` type that all methods return.
This method returns as soon as the headers for a successful response are received and does not consume the response body, so you are free to write custom parsing or streaming logic.

You can also use the `.withResponse()` method to get the raw `Response` along with the parsed data.
Unlike `.asResponse()` this method consumes the body, returning once it is parsed.

```typescript
const client = new Autofix();

const response = await client.complete().asResponse();
console.log(response.headers.get('X-My-Header'));
console.log(response.statusText); // access the underlying Response object

const { data: response, response: raw } = await client
  .complete()
  .withResponse();
console.log(raw.headers.get('X-My-Header'));
console.log(response.suggestion);
```

### Logging

> [!IMPORTANT]
> All log messages are intended for debugging only. The format and content of log messages
> may change between releases.

#### Log levels

The log level can be configured in two ways:

1. Via the `AUTOFIX_LOG` environment variable
2. Using the `logLevel` client option (overrides the environment variable if set)

```typescript
import Autofix from 'autofix';

const client = new Autofix({
  logLevel: 'debug', // Show all log messages
});
```

Available log levels, from most to least verbose:

- `'debug'` - Show debug messages, info, warnings, and errors
- `'info'` - Show info messages, warnings, and errors
- `'warn'` - Show warnings and errors (default)
- `'error'` - Show only errors
- `'off'` - Disable all logging

At the `'debug'` level, all HTTP requests and responses are logged, including headers and bodies.
Some authentication-related headers are redacted, but sensitive data in request and response bodies
may still be visible.

#### Custom logger

By default, this library logs to `globalThis.console`. You can also provide a custom logger.
Most logging libraries are supported, including [pino](https://www.npmjs.com/package/pino), [winston](https://www.npmjs.com/package/winston), [bunyan](https://www.npmjs.com/package/bunyan), [consola](https://www.npmjs.com/package/consola), [signale](https://www.npmjs.com/package/signale), and [@std/log](https://jsr.io/@std/log). If your logger doesn't work, please open an issue.

When providing a custom logger, the `logLevel` option still controls which messages are emitted, messages
below the configured level will not be sent to your logger.

```typescript
import Autofix from 'autofix';
import pino from 'pino';

const logger = pino();

const client = new Autofix({
  logger: logger.child({ name: 'Autofix' }),
  logLevel: 'debug', // Send all messages to pino, allowing it to filter
});
```

### Making custom/undocumented requests

This library is typed for convenient access to the documented API. If you need to access undocumented
endpoints, params, or response properties, the library can still be used.

#### Undocumented endpoints

To make requests to undocumented endpoints, you can use `client.get`, `client.post`, and other HTTP verbs.
Options on the client, such as retries, will be respected when making these requests.

```typescript
await client.post('/some/path', {
  body: { some_prop: 'foo' },
  query: { some_query_arg: 'bar' },
});
```

#### Undocumented request params

To make requests using undocumented parameters, you may use `// @ts-expect-error` on the undocumented
parameter. This library doesn't validate at runtime that the request matches the type, so any extra values you
send will be sent as-is.

```typescript
client.complete({
  // ...
  // @ts-expect-error baz is not yet public
  baz: 'undocumented option',
});
```

For requests with the `GET` verb, any extra params will be in the query, all other requests will send the
extra param in the body.

If you want to explicitly send an extra argument, you can do so with the `query`, `body`, and `headers` request
options.

#### Undocumented response properties

To access undocumented response properties, you may access the response object with `// @ts-expect-error` on
the response object, or cast the response object to the requisite type. Like the request params, we do not
validate or strip extra properties from the response from the API.

### Customizing the fetch client

By default, this library expects a global `fetch` function is defined.

If you want to use a different `fetch` function, you can either polyfill the global:

```typescript
import fetch from 'my-fetch';

globalThis.fetch = fetch;
```

Or pass it to the client:

```typescript
import Autofix from 'autofix';
import fetch from 'my-fetch';

const client = new Autofix({ fetch });
```

### Fetch options

If you want to set custom `fetch` options without overriding the `fetch` function, you can provide a `fetchOptions` object when instantiating the client or making a request. (Request-specific options override client options.)

```typescript
import Autofix from 'autofix';

const client = new Autofix({
  fetchOptions: {
    // `RequestInit` options
  },
});
```

#### Configuring proxies

To modify proxy behavior, you can provide custom `fetchOptions` that add runtime-specific proxy
options to requests:

<img src="https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/node.svg" align="top" width="18" height="21"> **Node** <sup>[[docs](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md#example---proxyagent-with-fetch)]</sup>

```typescript
import Autofix from 'autofix';
import * as undici from 'undici';

const proxyAgent = new undici.ProxyAgent('http://localhost:8888');
const client = new Autofix({
  fetchOptions: {
    dispatcher: proxyAgent,
  },
});
```

<img src="https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/bun.svg" align="top" width="18" height="21"> **Bun** <sup>[[docs](https://bun.sh/guides/http/proxy)]</sup>

```typescript
import Autofix from 'autofix';

const client = new Autofix({
  fetchOptions: {
    proxy: 'http://localhost:8888',
  },
});
```

<img src="https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/deno.svg" align="top" width="18" height="21"> **Deno** <sup>[[docs](https://docs.deno.com/api/deno/~/Deno.createHttpClient)]</sup>

```typescript
import Autofix from 'npm:autofix';

const httpClient = Deno.createHttpClient({
  proxy: { url: 'http://localhost:8888' },
});
const client = new Autofix({
  fetchOptions: {
    client: httpClient,
  },
});
```

## Requirements

- **Node.js**: 20 LTS or later
- **npm**: 9+
- **AI API Keys**: At least one provider key required

### Supported Runtimes

- Node.js 20+
- Modern web browsers
- Vercel (deployment)
- Local development

### Development Tools

- **Playwright**: E2E testing
- **Vitest**: Unit testing
- **TypeScript**: Type checking
- **Prettier**: Code formatting
- **Husky**: Git hooks

## Development

### Setup

```sh
git clone https://github.com/harpertoken/autofix.git
cd autofix
npm install
npm run prepare
```

### Available Scripts

```sh
npm run dev          # Start development server
npm run build        # Build for production
npm run check        # TypeScript type checking
npm run test         # Run unit tests
npm run test:e2e     # Run E2E tests
npm run format       # Format code with Prettier
npm run preflight    # Run all checks (format, check, test, build)
```

### Project Structure

```
autofix/
├── apps/
│   ├── cli/          # Command-line interface
│   ├── client/       # React web application
│   └── server/       # Node.js API server
├── packages/
│   └── shared/       # Shared utilities and types
├── tests/            # Test files
└── scripts/          # Build and utility scripts
```

### Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes with tests
4. Run preflight: `npm run preflight`
5. Commit with conventional format: `git commit -m "feat: add new feature"`
6. Push and open a PR

### Commit Convention

This project uses [Conventional Commits](https://conventionalcommits.org/):

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Testing
- `chore:` - Maintenance

### Release Process

Releases are automated using semantic-release:

- Push to `main` triggers release
- Version bumps based on commit messages
- NPM publishing for CLI package
- GitHub releases with changelogs

## Troubleshooting

### Common Issues

| Problem                   | Solution                                                |
| ------------------------- | ------------------------------------------------------- |
| `GEMINI_API_KEY` required | Get key from [Google AI Studio](https://ai.google.dev/) |
| Rate limit errors         | Add `SAMBANOVA_API_KEY` for fallback                    |
| CLI not found             | Run `npm install -g @harpertoken/autofix-cli`           |
| Web app not loading       | Check `npm run dev` output                              |
| Build failures            | Run `npm run preflight` to check all issues             |

### Debug Mode

Enable verbose logging:

```sh
DEBUG=autofix:* npm run dev
```

## Frequently Asked Questions

## Semantic versioning

This package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:

1. Changes that only affect static types, without breaking runtime behavior.
2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_
3. Changes that we do not expect to impact the vast majority of users in practice.

We take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.

We are keen for your feedback; please open an [issue](https://www.github.com/harpertoken/autofix/issues) with questions, bugs, or suggestions.

## License

MIT - See [LICENSE](LICENSE) file for details.

## Related Projects

- [Google Gemini](https://ai.google.dev/) - Primary AI provider
- [SambaNova](https://sambanova.ai/) - Fallback AI provider
