# Autofix

AI-powered text completion platform featuring a command-line tool, modern web editor, and Node.js server — all built for seamless writing assistance and automated publishing workflows.

| Component                                       | Package                    | Current Version | Distribution                        |
| ----------------------------------------------- | -------------------------- | --------------- | ----------------------------------- |
| **CLI Tool**                                    | `@harpertoken/autofix-cli` | **1.0.0**       | Published on npm                    |
| **Full Autofix System** (Web + Server + Shared) | Monorepo version           | **1.0.0**       | GitHub source + internal publishing |

---

## ⚠️ Important Notes

1. **Gemini API Required** — This tool depends on a valid **Google Gemini API key** for prediction features.
2. **Experimental AI Output** — Generated text may be inaccurate or biased. Always review before publishing.
3. **Release Automation Enabled** — Every valid commit to `main` may trigger a release deployment.

---

## Features

- **CLI Editor** — Instant AI fixes and completions from your terminal
- **Web Client** — React-based UI with real-time suggestions
- **Server + API** — Handles processing, storage, and authentication
- **Automated Releases** — Semantic-release to npm + GitHub Packages
- **Clean Dev Workflow** — Pre-commit formatting, types, and tests

---

## Requirements

- **Node.js**: v20+
- **npm**: v9+
- **Gemini API Key**: Required for predictions

### Optional Development Tools

- **Playwright** — for E2E testing
- **GitHub CLI (`gh`)** — to manage workflows easily

---

## Installation

1. Clone the repository:

   ```bash
    git clone https://github.com/harpertoken/autofix.git
   cd autofix
   ```

2. Install dependencies:

   ```bash
   ./autofix
   # or:
   npm install
   npm run prepare
   npm run format
   ```

3. Configure environment variables:

   ```bash
   cp .env.example .env
   # then add your Gemini API key
   ```

4. (Optional) Install CLI globally:

   ```bash
   npm install -g @harpertoken/autofix-cli
   ```

5. Start development:

   ```bash
   npm run dev
   ```

---

## Usage

### Full App

Runs server + web editor:

```bash
npm run dev
```

### CLI

See complete usage in:
**`apps/cli/README.md`**

Example:

```bash
autofix "hello wrld"
```

### Testing

```bash
npm run test:e2e
npm run test:report
```

---

## Command Line Interface

Example CLI help output:

```
Usage: autofix [options] <text>

Options:
  -h, --help        Show help
  -v, --version     Show version
  --model <name>    Select Gemini model
  --dry-run         Preview changes without applying
```

---

## Development

Follows **Conventional Commits** and strict pre-flight checks.

### Commit Standards

Types supported:

- feat:, fix:, docs:, style:, refactor:, test:, chore:, perf:, ci:, build:, revert:

**Validation Hook**

```bash
cp scripts/commit-msg .git/hooks/commit-msg
chmod +x .git/hooks/commit-msg
```

**Rewrite history to comply**

```bash
scripts/rewrite_msg.sh
git push --force-with-lease
```

---

## CI / Workflows

Manage GitHub Actions:

```bash
gh workflow enable "CLI"
gh workflow disable "E2E Tests"
```

For comprehensive linting of GitHub Actions workflows, install [actionlint](https://github.com/rhysd/actionlint):

```bash
# On macOS
brew install actionlint

# Or download from releases
```

Then run:

```bash
actionlint .github/workflows/*.yml
```

Enabled Workflows:

- **CLI**
- **CodeQL**
- **E2E Tests**
- **Release Automation**

---

## Release Process

Semantic-release automatically:

- **Bumps versions**
- Publishes to **npm** + **GitHub Packages**
- Generates **CHANGELOG.md**
- Creates **GitHub Release**

Requires:

- `GITHUB_TOKEN`
- `NPM_TOKEN`

Trigger:

- Push to `main` with `feat:` or `fix:` commits

---

## Project Structure

```
autofix/
├── apps/
│   ├── cli/          # CLI tool
│   ├── client/       # Web editor
├── packages/
│   ├── server/       # Node.js backend
│   └── shared/       # Shared logic
├── scripts/          # Tooling
└── .github/workflows # CI/CD
```

---

## Troubleshooting

| Problem                   | Fix                                       |
| ------------------------- | ----------------------------------------- |
| Gemini errors             | Check `.env` and API key permissions      |
| Release not triggered     | Ensure commit follows conventional format |
| Web client fails to start | Run `npm run prepare` first               |
| CLI missing after install | Reinstall globally with `-g`              |

---

## Contributing

1. Fork
2. Create branch
3. Write code + tests
4. Commit using conventional format
5. Open PR with clear summary

Example:

```bash
git checkout -b feat/new-ui
git commit -m "feat(ui): improve prediction panel layout"
```

---

## Related Projects

- Replit TextPredict (inspiration)
- Gemini Developer Documentation

---

## License

MIT — Free to modify, commercial use permitted.
