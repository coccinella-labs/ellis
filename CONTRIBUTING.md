# Contributing to Harper Autofix

Thank you for your interest in contributing to Harper Autofix! This document provides guidelines for contributors.

## Development Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up git hooks: `npm run prepare`
4. Start the development server: `npm run dev`
5. The app will be available at `http://localhost:3000`

## Project Structure

- `apps/client/`: React web client
- `apps/server/`: Node.js backend server
- `apps/cli/`: Command-line interface
- `packages/shared/`: Shared TypeScript code
- `tests/e2e/`: End-to-end tests

## Testing

Before submitting a pull request, please run the checks:

```bash
npm run preflight  # TypeScript check + unit tests with coverage + build
npm run test:e2e   # End-to-end tests
```

Or run individual commands:

- Type checking: `npm run check`
- Unit tests: `npm run test`
- Unit tests with coverage: `npm run test:coverage`
- Build: `npm run build`
- End-to-end tests: `npm run test:e2e`

## GitHub Actions Linting

To lint GitHub Actions workflows locally, install [actionlint](https://github.com/rhysd/actionlint):

```bash
# On macOS
brew install actionlint

# Or download from releases
```

Then run:

```bash
actionlint .github/workflows/*.yml
```

This helps catch YAML syntax errors and other issues before CI.

## Code Style

- Use TypeScript for all new code
- Follow the existing code style and patterns
- Add `data-testid` attributes to new UI components for testing
- Keep commits focused and descriptive

## Pull Requests

- Create a feature branch from `main`
- Write clear commit messages
- Include tests for new features
- Update documentation if needed

## Environment Variables

Copy `.env.example` to `.env` and add your API keys:

```
GEMINI_API_KEY=your_gemini_api_key_here
```

## Getting Help

If you have questions, feel free to open an issue or start a discussion.
