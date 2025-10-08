# Harper Autofix

AI-powered text completion editor with CLI, web client, and server. Supports automated releases to npm and GitHub Packages.

## Features

- **CLI Tool**: Command-line interface for text prediction using Gemini AI.
- **Web Client**: React-based editor with real-time text prediction.
- **Server**: Node.js backend handling API requests and storage.

## Test Release

This is a test commit to trigger the release process.

Updated tokens for dual publishing.

Added version check to prevent duplicates.

## Installation

1. Clone the repository:

   ```bash
    git clone https://github.com/harpertoken/autofix.git
    cd autofix
   ```

2. Install dependencies:

   ```bash
   ./autofix
   # This runs: npm install, npm run prepare, npm run format
   # Or manually:
   npm install
   npm run prepare
   npm run format
   ```

3. Set up environment variables: Copy `.env.example` to `.env` and add your Gemini API key.

4. (Optional) Install the CLI globally: `npm install -g @harpertoken/autofix-cli`

5. Run the development server:
   ```bash
   npm run dev
   ```

## Usage

- **Full App**: Run `npm run dev` to start server and web client.
- **CLI**: See [apps/cli/README.md](apps/cli/README.md) for CLI usage.
- **E2E Tests**: Run `npm run test:e2e` for end-to-end testing. View reports with `npm run test:report`.

## Development

Follows conventional commits. Pre-commit hooks format code and check types. Use `npm run preflight` for full checks.

### Conventional Commits Setup

To enforce conventional commit standards:

1. Copy the commit-msg hook: `cp scripts/commit-msg .git/hooks/commit-msg`
2. Make it executable: `chmod +x .git/hooks/commit-msg`

The hook enforces:

- First line ≤60 characters
- First line lowercase
- Starts with conventional types (feat:, fix:, docs:, style:, refactor:, test:, chore:, perf:, ci:, build:, revert:)

To clean up existing commit messages:

- Run `scripts/rewrite_msg.sh` to rewrite history (lowercase + truncate)
- Force push: `git push --force-with-lease`

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
