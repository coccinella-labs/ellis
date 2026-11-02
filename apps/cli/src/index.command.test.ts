/**
 * @vitest-environment node
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { program } from './index';
import fs from 'fs';
import os from 'os';
import path from 'path';

describe('CLI edit command', () => {
  beforeEach(() => {
    vi.spyOn(process, 'exit').mockImplementation(() => undefined as never);
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('requires an API key', () => {
    delete process.env.GEMINI_API_KEY;
    program.parse(['edit', 'missing.txt'], { from: 'user' });
    expect(process.exit).toHaveBeenCalledWith(1);
  });

  it('reports a missing file', () => {
    process.env.GEMINI_API_KEY = 'test';
    program.parse(['edit', 'definitely-missing.txt'], { from: 'user' });
    expect(process.exit).toHaveBeenCalledWith(1);
  });

  it('starts editing an existing file', () => {
    process.env.GEMINI_API_KEY = 'test';
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'hautofix-'));
    const file = path.join(dir, 'draft.txt');
    fs.writeFileSync(file, 'Original content.');

    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    program.parse(['edit', file], { from: 'user' });
    expect(logSpy).toHaveBeenCalled();
    logSpy.mockRestore();
  });
});

describe('CLI new command', () => {
  beforeEach(() => {
    vi.spyOn(process, 'exit').mockImplementation(() => undefined as never);
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('requires an API key', () => {
    delete process.env.GEMINI_API_KEY;
    program.parse(['new'], { from: 'user' });
    expect(process.exit).toHaveBeenCalledWith(1);
  });

  it('starts a new document', () => {
    process.env.GEMINI_API_KEY = 'test';
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    program.parse(['new'], { from: 'user' });
    expect(logSpy).toHaveBeenCalled();
    logSpy.mockRestore();
  });
});
