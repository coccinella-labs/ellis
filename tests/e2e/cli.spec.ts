import { test, expect } from '@playwright/test';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';

const execAsync = promisify(exec);

test('CLI new command creates output file', async () => {
  // Build CLI first
  await execAsync('cd apps/cli && npm run build');

  // Run CLI new command
  await execAsync(
    'cd apps/cli && printf "test content\\n.exit\\n" | node dist/index.js new --output test.txt',
    {
      env: {
        ...process.env,
        GEMINI_API_KEY: process.env.GEMINI_API_KEY || 'test_key',
      },
    }
  );

  // Check if output file exists
  expect(fs.existsSync('apps/cli/test.txt')).toBe(true);

  // Clean up
  if (fs.existsSync('apps/cli/test.txt')) {
    fs.unlinkSync('apps/cli/test.txt');
  }
});

test('CLI edit command modifies existing file', async () => {
  // Create a test file
  fs.writeFileSync('apps/cli/edit-test.txt', 'Original content.');

  // Build CLI first
  await execAsync('cd apps/cli && npm run build');

  // Run CLI edit command
  await execAsync(
    'cd apps/cli && printf "Modified content.\\n.exit\\n" | node dist/index.js edit edit-test.txt',
    {
      env: {
        ...process.env,
        GEMINI_API_KEY: process.env.GEMINI_API_KEY || 'test_key',
      },
    }
  );

  // Check if file content was modified
  const content = fs.readFileSync('apps/cli/edit-test.txt', 'utf-8');
  expect(content).toContain('Modified content.');

  // Clean up
  if (fs.existsSync('apps/cli/edit-test.txt')) {
    fs.unlinkSync('apps/cli/edit-test.txt');
  }
});

test('CLI handles missing API key error', async () => {
  // Build CLI first
  await execAsync('cd apps/cli && npm run build');

  // Run CLI without API key
  try {
    await execAsync(
      'cd apps/cli && printf "test\\n.exit\\n" | node dist/index.js new --output error-test.txt',
      {
        env: {
          ...process.env,
          GEMINI_API_KEY: '', // No key
        },
      }
    );
    // Should not reach here
    expect(true).toBe(false);
  } catch (error) {
    expect(error.message).toContain('GEMINI_API_KEY required');
  }

  // Clean up
  if (fs.existsSync('apps/cli/error-test.txt')) {
    fs.unlinkSync('apps/cli/error-test.txt');
  }
});

test('CLI handles file not found for edit', async () => {
  // Build CLI first
  await execAsync('cd apps/cli && npm run build');

  // Run CLI edit on non-existent file
  try {
    await execAsync(
      'cd apps/cli && printf "test\\n.exit\\n" | node dist/index.js edit nonexistent.txt',
      {
        env: {
          ...process.env,
          GEMINI_API_KEY: 'test_key',
        },
      }
    );
    expect(true).toBe(false);
  } catch (error) {
    expect(error.message).toContain('File not found');
  }
});
