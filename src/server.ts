
import app from './app';
import express, {Application, Request, Response} from 'express'
import { listeners } from 'node:process';
const http = require('http').Server(app);






let puerto = process.argv[2] || 3000;
console.log(puerto);

http.listen(puerto, ()=> {
    console.log(`Servidor escuchando en puerto ${puerto} PID Worker ${process.pid}`)
}).on("error", (err: any)=>{
    console.log(err)
})




