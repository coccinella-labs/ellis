# Workflows

This directory contains the GitHub Actions workflows for the Ellis repository. Each workflow is a separate file that runs on a trigger such as a push or pull request.

## Workflow overview

| File            | Trigger                                                                        | Purpose                                                                   |
| --------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| `cli.yml`       | push to `apps/cli/**`, `packages/shared/**`, `package-lock.json`; pull request | Build and smoke-test the CLI package                                      |
| `changelog.yml` | weekly cron, manual dispatch                                                   | Regenerate CHANGELOG from git tags and open a PR when it is stale         |
| `codeql.yml`    | push to `main`, pull request, manual dispatch                                  | Run CodeQL security analysis                                              |
| `docker.yml`    | push to `main`, pull request, manual dispatch                                  | Build and push the Docker image                                           |
| `e2e.yml`       | push to `main`, pull request                                                   | Run preflight checks and Playwright end-to-end tests                      |
| `ellis.yml`     | push to `main`, pull request target events                                     | Run preflight checks through the Ellis GitHub App and publish a check run |
| `release.yml`   | push to `main`                                                                 | Run preflight checks, build the CLI, run E2E tests, and publish a release |
| `validate.yml`  | pull request, manual dispatch                                                  | Validate workflow YAML with super-linter                                  |

## Common configuration

All workflows use Node.js 22 and the `ubuntu-latest` runner. The root and CLI installs use `npm ci`, which requires a committed `package-lock.json` and `apps/cli/package-lock.json`.

## Triggering workflows

- **Push to `main`**: runs `cli.yml`, `codeql.yml`, `docker.yml`, `e2e.yml`, `ellis.yml`, and `release.yml`.
- **Pull request**: runs `cli.yml`, `codeql.yml`, `docker.yml`, `e2e.yml`, `validate.yml`, and `ellis.yml`.
- **Manual dispatch**: available on `docker.yml`, `codeql.yml`, and `validate.yml`.

## Required secrets

| Secret                  | Used by                                           |
| ----------------------- | ------------------------------------------------- |
| `GEMINI_API_KEY`        | `e2e.yml`, `release.yml`, `cli.yml`, `ellis.yml`  |
| `GITHUB_TOKEN`          | `release.yml` (auto-generated)                    |
| `NPM_TOKEN`             | `release.yml` (for npm publish)                   |
| `ELLIS_APP_ID`          | `ellis.yml` (GitHub App for check-run publishing) |
| `ELLIS_APP_PRIVATE_KEY` | `ellis.yml` (GitHub App PEM private key)          |

The CLI smoke test skips when `GEMINI_API_KEY` is not set.

## Modifying a workflow

1. Edit the workflow file in this directory.
2. Validate the YAML locally with `npx super-linter -e RUN_LINTER_FROM_CHECKOUT` if available.
3. Push to `main` or open a pull request to observe the run.

Do not modify dependency metadata during CI. If a platform-specific package is needed, declare it in `package.json` and regenerate the lockfile locally before committing.
