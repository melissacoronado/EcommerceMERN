"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
//export const app:Application = express();
const cluster_1 = __importDefault(require("cluster"));
const http = require('http').Server(app_1.default);
//console.log('mode' + process.argv[5]);
let numCpus = require('os').cpus().length;
if (cluster_1.default.isMaster && process.argv[5] === "CLUSTER") {
    console.log(`numCpus ${numCpus} PID Master ${process.pid}`);
    for (let i = 0; i < numCpus; i++) {
        cluster_1.default.fork();
    }
    cluster_1.default.on('exit', (worker) => {
        console.log(`Worker ${worker.process.pid} termino ${new Date().toLocaleString()}`);
        cluster_1.default.fork();
    });
}
else {
    let puerto = process.argv[2] || 3000;
    http.listen(puerto, () => {
        console.log(`Servidor escuchando en puerto ${puerto} PID Worker ${process.pid}`);
    }).on("error", (err) => {
        console.log(err);
    });
}
