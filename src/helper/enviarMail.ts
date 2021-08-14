import nodemailer from 'nodemailer';
import { configSystem } from '../config/configs';
import { logger, loggerError } from '../helper/logger';


const transporter = nodemailer.createTransport({
    host: configSystem.HOST_MAIL,
    port: Number(configSystem.PORT_MAIL),
    secure: (/true/i).test(configSystem.SECURE_MAIL!),
    auth: {
      user: configSystem.USER_MAIL,
      pass: configSystem.PASS_MAIL,
    },
    tls : { rejectUnauthorized: (/true/i).test(configSystem.REJECT_UNAUTHORIZED_MAIL!) }
  });

export const sendMail = (mailOptions: any) => {
    transporter.sendMail(mailOptions, (err: any, info: any) => {
        if(err) {
            loggerError.error(`error transporter.sendMail: ${err} `);
            return err
        }
        //logger.info(info);
    })
}


const transporterGmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: configSystem.USER_GMAIL,
        pass: configSystem.PASS_GMAIL
    }
    , secure: false
    , tls : { rejectUnauthorized: false }
});

export const sendGMail = (mailOptions: any) => {
    //console.log('sendGMail')
    transporterGmail.sendMail(mailOptions, (err: any, info: any) => {
        if(err) {
            loggerError.error(`error transporter.sendGMail: ${err} `);
            return err
        }
        //logger.info(info);
    })
}
