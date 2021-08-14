import { configSystem } from "../config/configs";
import { logger, loggerError } from '../helper/logger';

const accountSid = configSystem.SMS_ACCOUNT_SID;
const authToken  = configSystem.SMS_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

export const sendSMS = (smsOptions: any) => {
    client.messages 
      .create(smsOptions) 
      .then((message: any) => logger.info(`${message.sid}`)) 
      .catch(loggerError.error)
      .done();
}