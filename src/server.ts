
import app from './app';
require('dotenv').config()
const http = require('http').Server(app);

export const usuariomail = 'donnell.prosacco36@ethereal.email';
export const passwmail = 'KM6YfTc6mYFygTp2eq';
export const emailAdministrador = 'melissa_coronado@hotmail.com';

export let puerto = process.env.PORT || 3001;

http.listen(process.env.PORT || puerto, ()=> {
    console.log(`Servidor escuchando en puerto ${puerto} PID Worker ${process.pid}`)
}).on("error", (err: any)=>{
    console.log(err)
})




