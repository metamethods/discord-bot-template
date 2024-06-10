import { pino, type Logger, type LoggerOptions } from 'pino';

/**
 * Creates a new logger instance.
 * @param options - Options for the logger
 * @returns {Logger} A logger instance
 */
export function createLogger(options: LoggerOptions): Logger {
  return pino({
    level: process.env.LOG_LEVEL,
    ...options
  });
}
