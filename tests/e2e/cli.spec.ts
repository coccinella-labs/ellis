import { test, expect } from '@playwright/test';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';

const execAsync = promisify(exec);

test('CLI new command creates output file', async () => {
  // Build CLI first
  await execAsync('cd apps/cli && npm run build');

  // Run CLI new command
  const { stdout } = await execAsync(
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
