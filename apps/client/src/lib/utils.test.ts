import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn', () => {
  it('merges classes', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });
  it('handles conditionals', () => {
    const show = false;
    expect(cn('foo', show && 'bar', 'baz')).toBe('foo baz');
  });
});
