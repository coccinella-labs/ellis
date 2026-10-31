# Repository guidance

## Project identity

- The product is **Ellis**.
- The existing CLI command is **`fx`**. Do not rename it during unrelated work.
- Keep the web application and CLI as distinct parts of the repository.

## Repository structure

- `apps/client/`: web client.
- `apps/server/`: application server.
- `packages/shared/`: shared client and server code.
- `apps/cli/`: separately managed CLI package.
- `tests/`: application and end-to-end tests.
- `dist/`: generated web build output.
- `api/index.js`: generated server bundle.

Follow existing project structure and configuration before introducing new conventions.

## Dependencies and lockfiles

- Keep root `package.json` and `package-lock.json` synchronized.
- Manage CLI dependencies through `apps/cli/package.json` and its lockfile.
- Use npm to update lockfiles. Never edit them manually.
- Use `npm ci` for clean installs in CI and Docker.
- Avoid adding dependencies when existing packages or platform APIs are sufficient.

## Build and verification

Run checks appropriate to the change and report exactly what passed.

- Install: `npm ci`
- TypeScript: `npm run check`
- Lint: `npm run lint`
- Unit tests: `npm test -- --run`
- Production build: `npm run build`
- Full preflight: `npm run preflight`
- End-to-end tests: `npm run test:e2e`
- CLI: from `apps/cli/`, run `npm ci` and `npm run build`

Never claim a check passed unless it was actually run.

## Docker

- Preserve `apps/client/`, `packages/shared/`, and root `public/` in the Docker build context.
- The root Docker image builds and runs the web application. The CLI is maintained separately.
- Keep the container port aligned with the server configuration.
- Avoid platform-specific build workarounds without a reproducible reason.

## Code and change discipline

- Follow existing TypeScript, React, Express, and test patterns.
- Keep changes focused. Avoid unrelated refactors and broad formatting changes.
- Add or update tests when changing observable behavior or shared logic.
- Preserve existing API and CLI behavior unless explicitly changing it.
- Do not silently swallow failed operations or return success-shaped results for failures.
- Inspect relevant configuration and call sites before changing runtime or build behavior.

## Security and generated files

- Never commit API keys, credentials, local environment files, or production secrets.
- Keep `.env` files out of version control.
- Treat build output, coverage reports, caches, and other generated artifacts as generated. Do not edit them manually.
- Do not weaken validation, authentication, or authorization to make tests pass.
