// Centralized logging utility
export const logger = {
  log: (message: string, ...args: unknown[]) => {
    console.log(`[LOG] ${message}`, ...args);
  },
  info: (message: string, ...args: unknown[]) => {
    console.info(`[INFO] ${message}`, ...args);
  },
  error: (message: string, ...args: unknown[]) => {
    console.error(`[ERROR] ${message}`, ...args);
  },
  warn: (message: string, ...args: unknown[]) => {
    console.warn(`[WARN] ${message}`, ...args);
  },
  debug: (message: string, ...args: unknown[]) => {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[DEBUG] ${message}`, ...args);
    }
  },
};
