import { describe, it, expect, vi, beforeEach } from 'vitest';
import { logger } from './logger.js';

describe('logger', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.LOG_LEVEL = undefined;
  });

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

  it('should pass extra args to console', () => {
    const consoleInfoSpy = vi
      .spyOn(console, 'info')
      .mockImplementation(() => {});

    logger.info('message', { extra: 'data' }, 42);

    expect(consoleInfoSpy).toHaveBeenCalledWith(
      expect.stringMatching(
        /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z \[INFO\] message/
      ),
      { extra: 'data' },
      42
    );

    consoleInfoSpy.mockRestore();
  });

  it('should set the log level', () => {
    logger.setLevel('error');
    expect(process.env.LOG_LEVEL).toBe('error');
  });

  it('should log JSON data', () => {
    const consoleInfoSpy = vi
      .spyOn(console, 'info')
      .mockImplementation(() => {});

    logger.json('info', { key: 'value' });

    const callArg = consoleInfoSpy.mock.calls[0][0] as string;
    const parsed = JSON.parse(callArg);
    expect(parsed.level).toBe('info');
    expect(parsed.key).toBe('value');
    expect(parsed.timestamp).toBeDefined();

    consoleInfoSpy.mockRestore();
  });

  it('should not log JSON at a higher level', () => {
    process.env.LOG_LEVEL = 'error';
    const consoleDebugSpy = vi
      .spyOn(console, 'debug')
      .mockImplementation(() => {});

    logger.json('debug', { key: 'value' });

    expect(consoleDebugSpy).not.toHaveBeenCalled();

    consoleDebugSpy.mockRestore();
  });
});
