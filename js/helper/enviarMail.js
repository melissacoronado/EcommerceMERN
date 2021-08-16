"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendGMail = exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const configs_1 = require("../config/configs");
const logger_1 = require("../helper/logger");
const transporter = nodemailer_1.default.createTransport({
    host: configs_1.configSystem.HOST_MAIL,
    port: Number(configs_1.configSystem.PORT_MAIL),
    secure: (/true/i).test(configs_1.configSystem.SECURE_MAIL),
    auth: {
        user: configs_1.configSystem.USER_MAIL,
        pass: configs_1.configSystem.PASS_MAIL,
    },
    tls: { rejectUnauthorized: (/true/i).test(configs_1.configSystem.REJECT_UNAUTHORIZED_MAIL) }
});
const sendMail = (mailOptions) => {
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            logger_1.loggerError.error(`error transporter.sendMail: ${err} `);
            return err;
        }
        //logger.info(info);
    });
};
exports.sendMail = sendMail;
const transporterGmail = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: configs_1.configSystem.USER_GMAIL,
        pass: configs_1.configSystem.PASS_GMAIL
    },
    secure: false,
    tls: { rejectUnauthorized: false }
});
const sendGMail = (mailOptions) => {
    //console.log('sendGMail')
    transporterGmail.sendMail(mailOptions, (err, info) => {
        if (err) {
            logger_1.loggerError.error(`error transporter.sendGMail: ${err} `);
            return err;
        }
        //logger.info(info);
    });
};
exports.sendGMail = sendGMail;
