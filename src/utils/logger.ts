import pino, { LoggerOptions } from 'pino';
import { envServerSchema } from '../config/env';
import { isEmptyObj } from 'openai/core';

const isDevelopment = envServerSchema.NODE_ENV === 'development';

let loggerOptions: LoggerOptions = {};

if (isDevelopment) {
  loggerOptions = {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'SYS:standard',
        ignore: 'pid,hostname',
      },
    },
  };
}

const baseLogger = pino(loggerOptions);

function createLogMethod(
  level: 'warn' | 'info' | 'error' | 'debug' | 'fatal' | 'trace' | 'silent'
) {
  return (prefix: string, msg: string, object = {}) => {
    baseLogger[level](
      isEmptyObj(object) ? {} : { object },
      `[${prefix}]: ${msg}`
    );
  };
}

// Criação de métodos específicos baseados nos níveis de log do Pino
const logger = {
  info: createLogMethod('info'),
  warn: createLogMethod('warn'),
  error: createLogMethod('error'),
  debug: createLogMethod('debug'),
  fatal: createLogMethod('fatal'),
  trace: createLogMethod('trace'),
  silent: createLogMethod('silent'),
};

export default logger;
