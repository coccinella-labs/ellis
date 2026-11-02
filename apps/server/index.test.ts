/**
 * @vitest-environment node
 */
import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';

vi.mock('./vite', () => ({
  setupVite: vi.fn(),
  serveStatic: vi.fn(),
  log: vi.fn(),
}));

vi.mock('http', () => ({
  createServer: vi.fn(() => ({
    listen: vi.fn((_port: number, _opts: unknown, cb?: () => void) => {
      if (cb) cb();
      return undefined;
    }),
  })),
}));

describe('server index', () => {
  beforeAll(() => {
    process.env.NODE_ENV = 'development';
    process.env.PORT = '3099';
    delete process.env.VERCEL;
  });

  afterAll(() => {
    delete process.env.NODE_ENV;
    delete process.env.PORT;
    delete process.env.VERCEL;
  });

  it('exports app and errorHandler', async () => {
    const mod = await import('./index');
    expect(mod.default).toBeTruthy();
    const res: any = { status: vi.fn().mockReturnThis(), json: vi.fn() };
    mod.errorHandler({ status: 400, message: 'bad' }, {} as any, res, vi.fn());
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'bad' });
  });

  it('uses the production branch with Vercel', async () => {
    vi.resetModules();
    process.env.NODE_ENV = 'production';
    process.env.PORT = '3100';
    process.env.VERCEL = '1';
    const mod = await import('./index');
    expect(mod.default).toBeTruthy();
    delete process.env.VERCEL;
  });

  it('uses the production branch without Vercel', async () => {
    vi.resetModules();
    process.env.NODE_ENV = 'production';
    process.env.PORT = '3101';
    delete process.env.VERCEL;
    const exitSpy = vi
      .spyOn(process, 'exit')
      .mockImplementation(() => undefined as never);
    const mod = await import('./index');
    expect(mod.default).toBeTruthy();
    process.emit('SIGTERM');
    expect(exitSpy).toHaveBeenCalledWith(0);
    exitSpy.mockRestore();
  });
});
