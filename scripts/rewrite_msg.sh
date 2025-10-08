#!/bin/bash

# Rewrite commit messages to lowercase and truncate to 60 chars
git filter-branch --msg-filter '
    first_line=$(head -n1)
    rest=$(tail -n +2)
    new_first=$(echo "$first_line" | tr "[:upper:]" "[:lower:]" | cut -c1-60)
    echo "$new_first"
    echo "$rest"
' -- --all

echo "History rewritten. Force push with: git push --force-with-lease"