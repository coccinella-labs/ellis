import { describe, it, expect, vi } from 'vitest';
import { logger } from './logger.js';

describe('logger', () => {
  it('should log messages with prefixes', () => {
    const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const consoleInfoSpy = vi
      .spyOn(console, 'info')
      .mockImplementation(() => {});
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const consoleWarnSpy = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => {});

    logger.log('test message');
    logger.info('info message');
    logger.error('error message');
    logger.warn('warn message');

    expect(consoleLogSpy).toHaveBeenCalledWith('[LOG] test message');
    expect(consoleInfoSpy).toHaveBeenCalledWith('[INFO] info message');
    expect(consoleErrorSpy).toHaveBeenCalledWith('[ERROR] error message');
    expect(consoleWarnSpy).toHaveBeenCalledWith('[WARN] warn message');

    consoleLogSpy.mockRestore();
    consoleInfoSpy.mockRestore();
    consoleErrorSpy.mockRestore();
    consoleWarnSpy.mockRestore();
  });

  it('should not log debug messages in production', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';

    const consoleDebugSpy = vi
      .spyOn(console, 'debug')
      .mockImplementation(() => {});

    logger.debug('debug message');

    expect(consoleDebugSpy).not.toHaveBeenCalled();

    consoleDebugSpy.mockRestore();
    process.env.NODE_ENV = originalEnv;
  });

  it('should log debug messages in development', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    const consoleDebugSpy = vi
      .spyOn(console, 'debug')
      .mockImplementation(() => {});

    logger.debug('debug message');

    expect(consoleDebugSpy).toHaveBeenCalledWith('[DEBUG] debug message');

    consoleDebugSpy.mockRestore();
    process.env.NODE_ENV = originalEnv;
  });
});
