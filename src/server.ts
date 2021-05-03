
import app from './app';
import express, {Application, Request, Response} from 'express'
//export const app:Application = express();
const http = require('http').Server(app);

let puerto = process.env.port || 3000;

http.listen(puerto, ()=> {
    console.log('Servidor escuchando en puerto 3000')
     
}).on("error", (err: any)=>{
    console.log(err)
})

