
import app from './app';
import express, {Application, Request, Response} from 'express'
//export const app:Application = express();
import cluster from 'cluster'
import { listeners } from 'node:process';
const http = require('http').Server(app);




//console.log('mode' + process.argv[5]);
let numCpus = require('os').cpus().length
if(cluster.isMaster && process.argv[5] === "CLUSTER"){
    console.log(`numCpus ${numCpus} PID Master ${process.pid}`);
    for(let i=0; i<numCpus; i++){
        cluster.fork();
    }
    cluster.on('exit', (worker) => {
        console.log(`Worker ${worker.process.pid} termino ${new Date().toLocaleString()}`);
        cluster.fork();
    })
}else{
    let puerto = process.argv[2] || 3000;

    http.listen(puerto, ()=> {
        console.log(`Servidor escuchando en puerto ${puerto} PID Worker ${process.pid}`)
    }).on("error", (err: any)=>{
        console.log(err)
    })
}



