#!/usr/bin/env bash
# Regenerate CHANGELOG.md from git tags and commit history.
# Walks tags oldest-to-newest, groups commits between consecutive tags,
# and writes a markdown changelog with correct coccinella-labs/ellis links.

set -euo pipefail

REPO="coccinella-labs/ellis"
BASE_URL="https://github.com/$REPO"
OUT="CHANGELOG.md"

# Get all tags sorted by version, oldest first
TAGS=$(git tag --list --sort=v:refname | grep -E '^v[0-9]' || true)

if [ -z "$TAGS" ]; then
  echo "No version tags found."
  exit 1
fi

# Header
{
  echo "# Changelog"
  echo
  echo "All notable changes to this project are documented here."
  echo
  echo "The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)."
  echo
} > "$OUT"

PREV_TAG=""
COUNT=0

for TAG in $TAGS; do
  # Determine the commit range for this tag
  if [ -z "$PREV_TAG" ]; then
    RANGE="$TAG"
  else
    RANGE="$PREV_TAG..$TAG"
  fi

  # Get commits in the range (exclude merge commits and skip-ci commits)
  COMMITS=$(git log --no-merges --format="%H %s" "$RANGE" 2>/dev/null || true)

  if [ -z "$COMMITS" ]; then
    PREV_TAG="$TAG"
    continue
  fi

  # Get the date of the tag (dereference annotated tags to their commit)
  TAG_COMMIT=$(git rev-parse "$TAG^{commit}" 2>/dev/null || echo "unknown")
  DATE=$(git log -1 --date=short --format="%ad" "$TAG_COMMIT" 2>/dev/null || echo "unknown")
  TAG_SHORT=$(git rev-parse --short "$TAG_COMMIT" 2>/dev/null || echo "$TAG_COMMIT")

  # Build compare link
  if [ -z "$PREV_TAG" ]; then
    COMPARE="$BASE_URL/commit/$TAG_SHORT"
  else
    PREV_SHORT=$(git rev-parse --short "$PREV_TAG" 2>/dev/null || echo "$PREV_TAG")
    COMPARE="$BASE_URL/compare/$PREV_SHORT...$TAG_SHORT"
  fi

  # Categorize commits
  FEATURES=$(echo "$COMMITS" | grep -iE "^(feat|feature)" | head -20 || true)
  FIXES=$(echo "$COMMITS" | grep -iE "^(fix|bugfix)" | head -20 || true)
  CHORES=$(echo "$COMMITS" | grep -iE "^(chore|build|ci|refactor|docs|style|test|perf)" | head -20 || true)
  OTHER=$(echo "$COMMITS" | grep -ivE "^(feat|feature|fix|bugfix|chore|build|ci|refactor|docs|style|test|perf)" | head -20 || true)

  {
    echo "## [$TAG]($COMPARE) ($DATE)"
    echo

    if [ -n "$FEATURES" ]; then
      echo "### Added"
      echo
      while IFS=' ' read -r sha rest; do
        [ -z "$sha" ] && continue
        short=$(git rev-parse --short "$sha" 2>/dev/null || echo "$sha")
        echo "- $rest ([${short}]($BASE_URL/commit/${short}))"
      done <<< "$FEATURES"
      echo
    fi

    if [ -n "$FIXES" ]; then
      echo "### Fixed"
      echo
      while IFS=' ' read -r sha rest; do
        [ -z "$sha" ] && continue
        short=$(git rev-parse --short "$sha" 2>/dev/null || echo "$sha")
        echo "- $rest ([${short}]($BASE_URL/commit/${short}))"
      done <<< "$FIXES"
      echo
    fi

    if [ -n "$CHORES" ]; then
      echo "### Changed"
      echo
      while IFS=' ' read -r sha rest; do
        [ -z "$sha" ] && continue
        short=$(git rev-parse --short "$sha" 2>/dev/null || echo "$sha")
        echo "- $rest ([${short}]($BASE_URL/commit/${short}))"
      done <<< "$CHORES"
      echo
    fi

    if [ -n "$OTHER" ]; then
      echo "### Other"
      echo
      while IFS=' ' read -r sha rest; do
        [ -z "$sha" ] && continue
        short=$(git rev-parse --short "$sha" 2>/dev/null || echo "$sha")
        echo "- $rest ([${short}]($BASE_URL/commit/${short}))"
      done <<< "$OTHER"
      echo
    fi
  } >> "$OUT"

  PREV_TAG="$TAG"
  COUNT=$((COUNT + 1))
done

# Strip trailing blank lines so a stale diff (a single newline) does not
# trigger an empty commit in the pull-request action.
sed -i -e :a -e '/^\n*$/{$d;N;ba}' -e 'P;D' "$OUT"

echo "Wrote $COUNT tag sections to $OUT"