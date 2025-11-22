/* -----------------------------------------------------------------------------
 * Clever Logger: Colorful, Timestamped, Level-Aware, & JSON-Capable
 * --------------------------------------------------------------------------- */

type LogLevel = 'log' | 'info' | 'warn' | 'error' | 'debug';

const LOG_LEVELS: Record<LogLevel, number> = {
  error: 0,
  warn: 1,
  info: 2,
  log: 3,
  debug: 4,
};

const withTimestamp = (level: LogLevel, message: string) =>
  `${new Date().toISOString()} [${level.toUpperCase()}] ${message}`;

const colors: Record<LogLevel, string> = {
  log: '\x1b[37m',
  info: '\x1b[36m',
  warn: '\x1b[33m',
  error: '\x1b[31m',
  debug: '\x1b[35m',
};

const reset = '\x1b[0m';

function getCurrentLogLevelValue(): number {
  const envLevel = process.env.LOG_LEVEL as LogLevel | undefined;
  return envLevel && LOG_LEVELS[envLevel] !== undefined
    ? LOG_LEVELS[envLevel]
    : LOG_LEVELS.log;
}

function print(level: LogLevel, message: string, args: unknown[]) {
  if (LOG_LEVELS[level] > getCurrentLogLevelValue()) return;

  const formatted = withTimestamp(level, message);
  const useColor = process.stdout.isTTY;

  const prefix = useColor ? `${colors[level]}${formatted}${reset}` : formatted;

  if (args.length === 0) {
    console[level](prefix);
  } else {
    console[level](prefix, ...args);
  }
}

export const logger = {
  setLevel(level: LogLevel) {
    (process.env.LOG_LEVEL as LogLevel) = level;
  },

  log: (message: string, ...args: unknown[]) => print('log', message, args),
  info: (message: string, ...args: unknown[]) => print('info', message, args),
  warn: (message: string, ...args: unknown[]) => print('warn', message, args),
  error: (message: string, ...args: unknown[]) => print('error', message, args),
  debug: (message: string, ...args: unknown[]) => print('debug', message, args),

  /**
   * Structured JSON logging for automated processing
   */
  json(level: LogLevel, data: Record<string, unknown>) {
    const currentLevel = getCurrentLogLevelValue();
    if (LOG_LEVELS[level] > currentLevel) return;
    console[level](
      JSON.stringify({ level, timestamp: new Date().toISOString(), ...data })
    );
  },
};
