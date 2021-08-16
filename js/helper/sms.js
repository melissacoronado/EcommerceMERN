"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSMS = void 0;
const configs_1 = require("../config/configs");
const logger_1 = require("../helper/logger");
const accountSid = configs_1.configSystem.SMS_ACCOUNT_SID;
const authToken = configs_1.configSystem.SMS_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const sendSMS = (smsOptions) => {
    client.messages
        .create(smsOptions)
        .then((message) => logger_1.logger.info(`${message.sid}`))
        .catch(logger_1.loggerError.error)
        .done();
};
exports.sendSMS = sendSMS;
