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
  createServer: vi.fn().mockResolvedValue({
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

  it('sets up vite middleware and handles index request', async () => {
    const callbacks: any[] = [];
    const app: any = {
      use: vi.fn((...args: any[]) => {
        const fn = [...args].reverse().find((arg) => typeof arg === 'function');
        if (fn) callbacks.push(fn);
      }),
      get: vi.fn().mockReturnValue('development'),
    };
    const server: any = {};
    await setupVite(app, server);

    const handler = callbacks.find((fn) => fn.length >= 3);
    expect(handler).toBeTruthy();

    const res: any = {
      status: vi.fn().mockReturnThis(),
      set: vi.fn().mockReturnThis(),
      end: vi.fn(),
    };
    const next = vi.fn();
    await handler({ originalUrl: '/' }, res, next);
    expect(res.end).toHaveBeenCalled();
  });

  it('handles vite middleware errors', async () => {
    const fs = await import('fs');
    (fs.default.promises.readFile as any).mockRejectedValueOnce(
      new Error('read failed')
    );

    const callbacks: any[] = [];
    const app: any = {
      use: vi.fn((...args: any[]) => {
        const fn = [...args].reverse().find((arg) => typeof arg === 'function');
        if (fn) callbacks.push(fn);
      }),
      get: vi.fn().mockReturnValue('development'),
    };
    const server: any = {};
    await setupVite(app, server);

    const handler = callbacks.find((fn) => fn.length >= 3);
    const res: any = {
      status: vi.fn().mockReturnThis(),
      set: vi.fn().mockReturnThis(),
      end: vi.fn(),
    };
    const next = vi.fn();
    await handler({ originalUrl: '/' }, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('serves static files', () => {
    const callbacks: any[] = [];
    const app: any = {
      use: vi.fn((...args: any[]) => {
        const fn = [...args].reverse().find((arg) => typeof arg === 'function');
        if (fn) callbacks.push(fn);
      }),
    };

    serveStatic(app);
    expect(app.use).toHaveBeenCalled();

    const handler = callbacks[callbacks.length - 1];
    expect(handler).toBeTruthy();

    const res: any = { sendFile: vi.fn() };
    handler({}, res);
    expect(res.sendFile).toHaveBeenCalled();
  });
});
