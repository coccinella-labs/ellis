# `Autofix`

[![NPM version](https://img.shields.io/npm/v/@harpertoken/autofix-cli.svg)](https://npmjs.org/package/@harpertoken/autofix-cli)

AI-powered text completion platform with CLI tool, web editor, and Node.js server for seamless writing assistance.

## `Installation`

### `CLI Tool (Recommended)`

```sh
npm install -g @harpertoken/autofix-cli
```

### `Full System (Development)`

```sh
git clone https://github.com/harpertoken/autofix.git
cd autofix
npm install
npm run prepare
```

## `Quick Start`

### `CLI Usage`

```sh
# Basic completion
autofix "hello this is a"

# With custom style and mode
autofix "write a function to" --style technical --mode sentence
```

### `Web Editor`

```sh
npm run dev
# Open http://localhost:3000
```

## `API Keys Setup`

This tool requires AI provider API keys for text completion.

### `Required: Google Gemini`

1. Get a [Google Gemini API key](https://ai.google.dev/)
2. Set environment variable:
   ```sh
   export GEMINI_API_KEY=your_api_key_here
   ```

### `Optional: SambaNova (Fallback)`

1. Get a [SambaNova API key](https://sambanova.ai/)
2. Set environment variable:
   ```sh
   export SAMBANOVA_API_KEY=your_api_key_here
   ```

> [!NOTE]
> SambaNova provides automatic fallback when Gemini hits rate limits (200 requests/day free tier).

## `Features`

### `CLI Editor`

- Real-time AI text completion
- Multiple completion modes: word, sentence, paragraph
- Writing styles: casual, formal, creative, technical
- Auto-save functionality
- Keyboard shortcuts support

### `Web Client`

- Modern React-based interface
- Live text completion
- Settings panel with craft options
- Responsive design
- Welcome modal for new users

### `Server & API`

- RESTful API endpoints
- Dual AI provider support
- Automatic fallback system
- Request/response validation
- Error handling and logging

### `Development`

- TypeScript throughout
- Pre-commit hooks (Husky)
- Automated testing (Vitest + Playwright)
- Code formatting (Prettier)
- Semantic release automation

## `Usage`

### `CLI Commands`

```sh
# Start interactive editor
autofix

# Complete specific text
autofix "hello world this is"

# Edit existing file
autofix edit myfile.txt

# Create new file
autofix new
```

### `CLI Options`

```sh
-m, --mode <mode>     Completion mode: word, sentence, paragraph
-s, --style <style>   Writing style: casual, formal, creative, technical
-o, --output <file>   Output file path
-h, --help            Show help
-v, --version         Show version
```

### `Web API`

The server provides REST endpoints for text completion:

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

### `Status Endpoint`

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

## `AI Provider Fallback`

Autofix uses a smart fallback system for maximum reliability:

1. **Primary**: Google Gemini 3.0 Pro Preview (latest model)
2. **Fallback**: SambaNova GPT-OSS-120B (when Gemini rate limited)

The system automatically detects rate limits and switches providers seamlessly.

### `Rate Limit Handling`

```typescript
// Automatic fallback on 429 errors
if (geminiError.status === 429) {
  return await sambaNovaFallback(text, mode, style);
}
```

## `Requirements`

- **Node.js**: 20 LTS or later
- **npm**: 9+
- **AI API Keys**: At least one provider key required

### `Supported Runtimes`

- Node.js 20+
- Modern web browsers
- Vercel (deployment)
- Local development

### `Development Tools`

- **Playwright**: E2E testing
- **Vitest**: Unit testing
- **TypeScript**: Type checking
- **Prettier**: Code formatting
- **Husky**: Git hooks

## `Development`

### Setup

```sh
git clone https://github.com/harpertoken/autofix.git
cd autofix
npm install
npm run prepare
```

### `Available Scripts`

```sh
npm run dev          # Start development server
npm run build        # Build for production
npm run check        # TypeScript type checking
npm run test         # Run unit tests
npm run test:e2e     # Run E2E tests
npm run format       # Format code with Prettier
npm run preflight    # Run all checks (format, check, test, build)
```

### `Project Structure`

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

### `Contributing`

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes with tests
4. Run preflight: `npm run preflight`
5. Commit with conventional format: `git commit -m "feat: add new feature"`
6. Push and open a PR

### `Commit Convention`

This project uses [Conventional Commits](https://conventionalcommits.org/):

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Testing
- `chore:` - Maintenance

### `Release Process`

Releases are automated using semantic-release:

- Push to `main` triggers release
- Version bumps based on commit messages
- NPM publishing for CLI package
- GitHub releases with changelogs

## `Troubleshooting`

### `Common Issues`

| Problem                   | Solution                                                |
| ------------------------- | ------------------------------------------------------- |
| `GEMINI_API_KEY` required | Get key from [Google AI Studio](https://ai.google.dev/) |
| Rate limit errors         | Add `SAMBANOVA_API_KEY` for fallback                    |
| CLI not found             | Run `npm install -g @harpertoken/autofix-cli`           |
| Web app not loading       | Check `npm run dev` output                              |
| Build failures            | Run `npm run preflight` to check all issues             |

### `Debug Mode`

Enable verbose logging:

```sh
DEBUG=autofix:* npm run dev
```

## `License`

MIT - See [LICENSE](LICENSE) file for details.

## `Related Projects`

- [Google Gemini](https://ai.google.dev/) - Primary AI provider
- [SambaNova](https://sambanova.ai/) - Fallback AI provider
