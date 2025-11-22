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

    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringMatching(
        /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z \[LOG\] test message/
      )
    );
    expect(consoleInfoSpy).toHaveBeenCalledWith(
      expect.stringMatching(
        /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z \[INFO\] info message/
      )
    );
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringMatching(
        /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z \[ERROR\] error message/
      )
    );
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringMatching(
        /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z \[WARN\] warn message/
      )
    );

    consoleLogSpy.mockRestore();
    consoleInfoSpy.mockRestore();
    consoleErrorSpy.mockRestore();
    consoleWarnSpy.mockRestore();
  });

  it('should not log debug messages in production', () => {
    const originalLevel = process.env.LOG_LEVEL;
    process.env.LOG_LEVEL = 'warn';

    const consoleDebugSpy = vi
      .spyOn(console, 'debug')
      .mockImplementation(() => {});

    logger.debug('debug message');

    expect(consoleDebugSpy).not.toHaveBeenCalled();

    consoleDebugSpy.mockRestore();
    process.env.LOG_LEVEL = originalLevel;
  });

  it('should log debug messages in development', () => {
    const originalLevel = process.env.LOG_LEVEL;
    process.env.LOG_LEVEL = 'debug';

    const consoleDebugSpy = vi
      .spyOn(console, 'debug')
      .mockImplementation(() => {});

    logger.debug('debug message');

    expect(consoleDebugSpy).toHaveBeenCalledWith(
      expect.stringMatching(
        /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z \[DEBUG\] debug message/
      )
    );

    consoleDebugSpy.mockRestore();
    process.env.LOG_LEVEL = originalLevel;
  });
});
