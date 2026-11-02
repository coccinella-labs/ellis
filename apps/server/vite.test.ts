/**
 * @vitest-environment node
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('fs', () => ({
  default: {
    promises: {
      readFile: vi.fn().mockResolvedValue('<html>src="/src/main.tsx"</html>'),
    },
    existsSync: vi.fn().mockReturnValue(true),
  },
  promises: {
    readFile: vi.fn().mockResolvedValue('<html>src="/src/main.tsx"</html>'),
  },
  existsSync: vi.fn().mockReturnValue(true),
}));

vi.mock('vite', () => ({
  createServer: vi
    .fn()
    .mockResolvedValue({
      middlewares: {},
      transformIndexHtml: vi.fn().mockResolvedValue('<html></html>'),
      ssrFixStacktrace: vi.fn(),
    }),
  createLogger: vi.fn().mockReturnValue({ error: vi.fn() }),
}));

vi.mock('express-rate-limit', () => ({
  default: vi.fn().mockReturnValue((_req: any, _res: any, next: any) => next()),
}));

vi.mock('nanoid', () => ({
  nanoid: vi.fn().mockReturnValue('id'),
}));

vi.mock('../../vite.config', () => ({
  default: {},
}));

import { log, setupVite, serveStatic } from './vite';

describe('vite helpers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('logs message', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    log('hello', 'test');
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('sets up vite middleware', async () => {
    const app: any = {
      use: vi.fn(),
      get: vi.fn().mockReturnValue('development'),
    };
    const server: any = {};
    await setupVite(app, server);
    expect(app.use).toHaveBeenCalled();
  });

  it('serves static files', () => {
    const app: any = { use: vi.fn() };
    expect(() => serveStatic(app)).not.toThrow();
    expect(app.use).toHaveBeenCalled();
  });
});
