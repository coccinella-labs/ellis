/**
 * @vitest-environment node
 */
import { describe, it, expect, vi } from 'vitest';
import { log } from './vite';

describe('vite log', () => {
  it('logs message', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    log('hello', 'test');
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
