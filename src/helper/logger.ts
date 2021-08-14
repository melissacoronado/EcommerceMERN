import { configure, getLogger } from 'log4js';
import path from 'path';

configure({
    appenders: {
      consolelog: { type: "console" },
      warnlog: { type: 'file', filename: path.resolve(__dirname, '../', 'logs/warn.log') },
      errorLog: { type: 'file', filename: path.resolve(__dirname, '../', 'logs/error.log') }
    },
    categories: {
      default: { appenders: ["consolelog"], level: "trace" },
      archivoWarn: { appenders: ["warnlog"], level: "warn" },
      archivoError: { appenders: ["errorLog"], level: "error" },
      todos: { appenders: ["consolelog", "warnlog", "errorLog"], level: "error" }
    }
  });



  export const logger = getLogger();
  export const loggerError = getLogger('archivoError');
  export const loggerWarn = getLogger('archivoWarn');