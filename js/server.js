"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.puerto = void 0;
const app_1 = __importDefault(require("./app"));
const http = require('http').Server(app_1.default);
exports.puerto = process.argv[2] || 3000;
console.log(exports.puerto);
http.listen(exports.puerto, () => {
    console.log(`Servidor escuchando en puerto ${exports.puerto} PID Worker ${process.pid}`);
}).on("error", (err) => {
    console.log(err);
});
