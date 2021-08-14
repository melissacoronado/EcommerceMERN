import path from "path";
import * as dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, 'config', '../.env') })

export const configSystem = {
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
}

//console.log(configSystem);