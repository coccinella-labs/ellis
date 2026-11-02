/**
 * @vitest-environment node
 */
import { describe, it, expect } from 'vitest';
import { findEnvFile } from './index';
import fs from 'fs';
import path from 'path';
import os from 'os';

describe('findEnvFile', () => {
  it('returns null when no .env exists', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'hautofix-'));
    expect(findEnvFile(dir)).toBeNull();
  });

  it('finds .env in the starting directory', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'hautofix-'));
    const envPath = path.join(dir, '.env');
    fs.writeFileSync(envPath, 'GEMINI_API_KEY=test');
    expect(findEnvFile(dir)).toBe(envPath);
  });

  it('finds .env in a parent directory', () => {
    const parent = fs.mkdtempSync(path.join(os.tmpdir(), 'hautofix-'));
    const child = path.join(parent, 'nested');
    fs.mkdirSync(child);
    const envPath = path.join(parent, '.env');
    fs.writeFileSync(envPath, 'GEMINI_API_KEY=test');
    expect(findEnvFile(child)).toBe(envPath);
  });
});
