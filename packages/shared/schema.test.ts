import { describe, it, expect } from 'vitest';
import { z } from 'zod';
// Assuming schema.ts exports some schemas
// import { someSchema } from './schema';

describe('Schema validation', () => {
  it('validates basic string', () => {
    const schema = z.string();
    expect(schema.safeParse('test').success).toBe(true);
    expect(schema.safeParse(123).success).toBe(false);
  });

  // Add more tests based on actual schemas
});
