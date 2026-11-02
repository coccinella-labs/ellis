/**
 * @vitest-environment node
 */
import { describe, it, expect, vi } from 'vitest';

vi.mock('fs', () => ({
  default: { promises: { readFile: vi.fn() }, existsSync: vi.fn() },
  promises: { readFile: vi.fn() },
  existsSync: vi.fn(),
}));

vi.mock('vite', () => ({
  createServer: vi.fn(),
  createLogger: vi.fn().mockReturnValue({ error: vi.fn() }),
}));

vi.mock('express-rate-limit', () => ({
  default: vi.fn().mockReturnValue((_req: any, _res: any, next: any) => next()),
}));

vi.mock('nanoid', () => ({ nanoid: vi.fn().mockReturnValue('id') }));
vi.mock('../../vite.config', () => ({ default: {} }));

describe('vite missed branches', () => {
  it('invokes the vite error logger', async () => {
    const { createServer } = await import('vite');
    vi.mocked(createServer).mockImplementation(async (options: any) => {
      options.customLogger.error('boom');
      return {
        middlewares: {},
        transformIndexHtml: vi.fn(),
        ssrFixStacktrace: vi.fn(),
      } as any;
    });
    const exitSpy = vi
      .spyOn(process, 'exit')
      .mockImplementation(() => undefined as never);
    const { setupVite } = await import('./vite');
    const app: any = {
      use: vi.fn(),
      get: vi.fn().mockReturnValue('development'),
    };
    await setupVite(app, {} as any);
    expect(exitSpy).toHaveBeenCalledWith(1);
    exitSpy.mockRestore();
  });

  it('throws when the build directory is missing', async () => {
    const fs = await import('fs');
    (fs as any).existsSync.mockReturnValue(false);
    (fs.default as any).existsSync.mockReturnValue(false);
    const { serveStatic } = await import('./vite');
    const app: any = { use: vi.fn() };
    expect(() => serveStatic(app)).toThrow(
      /Could not find the build directory/
    );
  });
});
