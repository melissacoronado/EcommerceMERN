"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerWarn = exports.loggerError = exports.logger = void 0;
const log4js_1 = require("log4js");
const path_1 = __importDefault(require("path"));
log4js_1.configure({
    appenders: {
        consolelog: { type: "console" },
        warnlog: { type: 'file', filename: path_1.default.resolve(__dirname, '../', 'logs/warn.log') },
        errorLog: { type: 'file', filename: path_1.default.resolve(__dirname, '../', 'logs/error.log') }
    },
    categories: {
        default: { appenders: ["consolelog"], level: "trace" },
        archivoWarn: { appenders: ["warnlog"], level: "warn" },
        archivoError: { appenders: ["errorLog"], level: "error" },
        todos: { appenders: ["consolelog", "warnlog", "errorLog"], level: "error" }
    }
});
exports.logger = log4js_1.getLogger();
exports.loggerError = log4js_1.getLogger('archivoError');
exports.loggerWarn = log4js_1.getLogger('archivoWarn');
