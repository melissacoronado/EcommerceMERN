
import app from './app';
//import express, {Application, Request, Response} from 'express'
//import { listeners } from 'node:process';
const http = require('http').Server(app);

export const usuariomail = 'donnell.prosacco36@ethereal.email';
export const passwmail = 'KM6YfTc6mYFygTp2eq';
export const emailAdministrador = 'melissa_coronado@hotmail.com';



export let puerto = process.argv[2] || 3000;
console.log(puerto);

http.listen(process.env.PORT || puerto, ()=> {
    console.log(`Servidor escuchando en puerto ${puerto} PID Worker ${process.pid}`)
}).on("error", (err: any)=>{
    console.log(err)
})




