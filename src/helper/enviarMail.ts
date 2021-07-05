const nodemailer = require('nodemailer')
import { usuariomail, passwmail } from '../server'

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,     // Agregale esta linea
    auth: {
        user: usuariomail,
        pass: passwmail
    },
    tls : { rejectUnauthorized: false }
});


export const sendMail = (mailOptions: any) => {
    transporter.sendMail(mailOptions, (err: any, info: any) => {
        if(err) {
            console.log(`error transporter.sendMail: ${err}`)
            return err
        }
        console.log(info)
    })
}


const transporterGmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'pruebasd03@gmail',
        pass: '1592630*'
    }
    , secure: false     // Agregale esta linea
    , tls : { rejectUnauthorized: false }
});

export const sendGMail = (mailOptions: any) => {
    //console.log('sendGMail')
    transporterGmail.sendMail(mailOptions, (err: any, info: any) => {
        if(err) {
            console.log(`error transporter.sendGMail: ${err}`)
            return err
        }
        //console.log(info)
    })
}
