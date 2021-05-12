"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const http = require('http').Server(app_1.default);
let puerto = process.argv[2] || 3000;
console.log(puerto);
http.listen(puerto, () => {
    console.log(`Servidor escuchando en puerto ${puerto} PID Worker ${process.pid}`);
}).on("error", (err) => {
    console.log(err);
});
