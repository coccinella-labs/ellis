/**
 * @vitest-environment node
 */
import { describe, it, expect } from 'vitest';
import { findEnvFile } from './index';

describe('findEnvFile', () => {
  it('returns string or null', () => {
    const result = findEnvFile(process.cwd());
    expect(result === null || typeof result === 'string').toBe(true);
  });
});
