/**
 * @vitest-environment node
 */
import { describe, it, expect, beforeAll } from 'vitest';

describe('server index', () => {
  beforeAll(() => {
    process.env.NODE_ENV = 'development';
  });

  it('exports app', async () => {
    const mod = await import('./index');
    expect(mod.default).toBeTruthy();
  });
});
