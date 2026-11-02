/**
 * @vitest-environment node
 */
import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';

describe('CLI index parse guard', () => {
  beforeAll(() => {
    process.env.VITEST = 'false';
    process.argv = ['node', 'index.js'];
    vi.spyOn(process, 'exit').mockImplementation(() => undefined as never);
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    process.env.VITEST = 'true';
  });

  it('parses when not running under Vitest', async () => {
    const mod = await import('./index');
    expect(mod).toBeTruthy();
  });
});
