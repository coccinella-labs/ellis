# Harper Autofix

AI-powered text completion editor with CLI, web client, and server.

## Features

- **CLI Tool**: Command-line interface for text prediction using Gemini AI.
- **Web Client**: React-based editor with real-time text prediction.
- **Server**: Node.js backend handling API requests and storage.

## Installation

1. Clone the repository:

   ```bash
    git clone https://github.com/harpertoken/autofix.git
    cd autofix
   ```

2. Install dependencies:

   ```bash
   npm install
   npm run prepare
   ```

3. Set up environment variables: Copy `.env.example` to `.env` and add your Gemini API key.

4. Run the development server:
   ```bash
   npm run dev
   ```

## Usage

- **Full App**: Run `npm run dev` to start server and web client.
- **CLI**: See [apps/cli/README.md](apps/cli/README.md) for CLI usage.
- **E2E Tests**: Run `npm run test:e2e` for end-to-end testing. View reports with `npm run test:report`.

## Development

Follows conventional commits. Pre-commit hooks format code and check types. Use `npm run preflight` for full checks.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## Releasing

The project uses semantic-release for automatic versioning and publishing:

- Pushes to `main`/`master` with commits like `feat:` or `fix:` trigger releases
- Versions are auto-bumped based on commit types
- GitHub releases are created automatically
- CLI package is published to npm
- CHANGELOG.md is updated

Requires `GITHUB_TOKEN` (automatic) and `NPM_TOKEN` secrets in repo settings.

Inspired by [Replit TextPredict](https://replit.com/@harpertoken/TextPredict)

## License

MIT
