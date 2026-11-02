# Workflows

This directory contains the GitHub Actions workflows for the Ellis repository. Each workflow is a separate file that runs on a trigger such as a push or pull request.

## Workflow overview

| File            | Trigger                                                                        | Purpose                                                                   |
| --------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| `changelog.yml` | weekly cron, manual dispatch                                                   | Regenerate CHANGELOG from git tags and open a PR when it is stale         |
| `cli.yml`       | push to `apps/cli/**`, `packages/shared/**`, `package-lock.json`; pull request | Build and smoke-test the CLI package                                      |
| `codeql.yml`    | push to `main`, pull request, manual dispatch                                  | Run CodeQL security analysis                                              |
| `docker.yml`    | push to `main`, pull request, manual dispatch                                  | Build and push the Docker image                                           |
| `duplicate.yml` | issues, pull request                                                           | Close duplicate issues and pull requests via the Ellis bot                |
| `e2e.yml`       | push to `main`, pull request                                                   | Run preflight checks and Playwright end-to-end tests                      |
| `ellis.yml`     | push to `main`, pull request target events                                     | Run preflight checks through the Ellis GitHub App and publish a check run |
| `labeler.yml`   | pull request, issues                                                           | Auto-label PRs and issues from changed files and metadata                 |
| `merge.yml`     | pull request                                                                   | Auto-merge PRs carrying the merge:ready label after review                |
| `proof.yml`     | pull request                                                                   | Verify PR body against template, title conventions, and commit messages   |
| `release.yml`   | push to `main`                                                                 | Run preflight checks, build the CLI, run E2E tests, and publish a release |
| `size.yml`      | pull request                                                                   | Label PRs by size and comment on oversized changes                        |
| `stale.yml`     | weekly cron, manual dispatch                                                   | Close stale issues and pull requests                                      |
| `validate.yml`  | pull request, manual dispatch                                                  | Validate workflow YAML with super-linter                                  |

## Common configuration

All workflows use Node.js 22 and the `ubuntu-latest` runner. The root and CLI installs use `npm ci`, which requires a committed `package-lock.json` and `apps/cli/package-lock.json`.

## Triggering workflows

- **Push to `main`**: runs `changelog.yml`, `cli.yml`, `codeql.yml`, `docker.yml`, `e2e.yml`, `ellis.yml`, `release.yml`, and `stale.yml`.
- **Pull request**: runs `cli.yml`, `codeql.yml`, `docker.yml`, `e2e.yml`, `validate.yml`, `ellis.yml`, `duplicate.yml`, `labeler.yml`, `merge.yml`, and `size.yml`.
- **Issues**: runs `duplicate.yml` and `labeler.yml`.
- **Manual dispatch**: available on `changelog.yml`, `codeql.yml`, `docker.yml`, `stale.yml`, and `validate.yml`.

## Required secrets

| Secret                  | Used by                                                                                  |
| ----------------------- | ---------------------------------------------------------------------------------------- |
| `GEMINI_API_KEY`        | `e2e.yml`, `release.yml`, `cli.yml`, `ellis.yml`                                         |
| `GITHUB_TOKEN`          | `release.yml` (auto-generated)                                                           |
| `NPM_TOKEN`             | `release.yml` (for npm publish)                                                          |
| `ELLIS_APP_ID`          | `ellis.yml`, `stale.yml`, `merge.yml`, `changelog.yml`, `proof.yml` (GitHub App ID)      |
| `ELLIS_APP_PRIVATE_KEY` | `ellis.yml`, `stale.yml`, `merge.yml`, `changelog.yml`, `proof.yml` (GitHub App PEM key) |

The CLI smoke test skips when `GEMINI_API_KEY` is not set.

## Modifying a workflow

1. Edit the workflow file in this directory.
2. Validate the YAML locally with `npx super-linter -e RUN_LINTER_FROM_CHECKOUT` if available.
3. Push to `main` or open a pull request to observe the run.

Do not modify dependency metadata during CI. If a platform-specific package is needed, declare it in `package.json` and regenerate the lockfile locally before committing.
