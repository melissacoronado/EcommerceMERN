"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configSystem = void 0;
const path_1 = __importDefault(require("path"));
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: path_1.default.resolve(__dirname, 'config', '../.env') });
exports.configSystem = {
    PORT: process.env.PORT,
    TOKEN_KEY: process.env.TOKEN_KEY,
    TOKEN_EXPIRES: process.env.TOKEN_EXPIRES,
    USER_MAIL: process.env.USER_MAIL,
    PASS_MAIL: process.env.PASS_MAIL,
    HOST_MAIL: process.env.HOST_MAIL,
    PORT_MAIL: process.env.PORT_MAIL,
    SECURE_MAIL: process.env.SECURE_MAIL,
    REJECT_UNAUTHORIZED_MAIL: process.env.REJECT_UNAUTHORIZED_MAIL,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    SESSION_SECRET: process.env.SESSION_SECRET,
    USER_GMAIL: process.env.USER_GMAIL,
    PASS_GMAIL: process.env.PASS_GMAIL,
    DB_URI: process.env.DB_URI,
    DB_USE_NEW_URL_PARSER: process.env.DB_USE_NEW_URL_PARSER,
    DB_USE_UNIFIED_TOPOLOGY: process.env.DB_USE_UNIFIED_TOPOLOGY,
    SESSION_SECRET_SECRET: process.env.SESSION_SECRET_SECRET,
    SESSION_SECRET_COOKIE_MAXAGE: process.env.SESSION_SECRET_COOKIE_MAXAGE,
    SMS_ACCOUNT_SID: process.env.SMS_ACCOUNT_SID,
    SMS_AUTH_TOKEN: process.env.SMS_AUTH_TOKEN
};
//console.log(configSystem);
