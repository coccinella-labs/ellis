# Contributing

Use Node.js 22 or later.

Install the repo and start the app:

```sh
npm ci
npm run prepare
npm run dev
```

The app runs at `http://localhost:3000`.

`npm run prepare` installs the Husky hooks. The `pre-commit` hook runs
lint-staged (Prettier and ESLint) on staged files. The `commit-msg` hook runs
`scripts/commit-msg`, which enforces a subject line of 80 characters or fewer
and requires a body of at least two lines for changes touching more than five
files or more than two new tests.

## Signed commits

All commits must be SSH-signed. Configure the repository checkout once:

```sh
git config --local gpg.format ssh
git config --local user.signingkey ~/.ssh/id_ed25519
git config --local commit.gpgsign true
git config --local gpg.ssh.allowedSignersFile ~/.ssh/allowed_signers
```

Replace the signing key path with your own SSH private key. The
allowed-signers file must contain your signing identity so signatures verify
locally. Check the result with:

```sh
git log --show-signature -1
```

Set provider keys in your shell or in a local `.env` file:

```sh
GEMINI_API_KEY=your_gemini_key
SAMBANOVA_API_KEY=your_sambanova_key
OPENROUTER_API_KEY=your_openrouter_key
ATLASCLOUD_API_KEY=your_atlascloud_key
```

Before opening a pull request, run:

```sh
npm run preflight
npm run test:e2e
```

If you change the CLI, also run `npm ci` and `npm run build` from `apps/cli/`.

Keep commits focused. Update docs when behavior changes.
