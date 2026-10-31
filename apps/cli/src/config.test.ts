import { describe, it, expect } from 'vitest';
import { defaultConfig, loadConfig } from './config';

describe('CLI config', () => {
  it('has defaults', () => {
    expect(defaultConfig.defaultMode).toBe('sentence');
    expect(defaultConfig.defaultStyle).toBe('casual');
  });
  it('loadConfig returns defaults', () => {
    expect(loadConfig()).toEqual(defaultConfig);
  });
});
