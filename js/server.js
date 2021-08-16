"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.puerto = void 0;
const configs_1 = require("./config/configs");
const logger_1 = require("./helper/logger");
const app_1 = __importDefault(require("./app"));
const http = __importStar(require("http"));
const mensaje_service_1 = require("./services/mensaje.service");
var server = http.createServer(app_1.default);
exports.puerto = configs_1.configSystem.PORT || 3001;
let msgService = new mensaje_service_1.MensajeService();
//-------SOCKET----
//Trabaje solo el backend pero esto esta probado de la entrega del desafio 13
const io = require('socket.io')(http, { autoConnect: false /*, transports: ['websocket']*/ });
io.on('connection', (socket) => {
    let idSock = socket.id;
    let addedMail = false;
    console.log('A user connected' + socket.id);
    //chat
    socket.on('New chatMsg', (data) => {
        //Leer data
        const { email, message, timestamp } = data;
        //Agregar usuario - asociar correo con socket
        if (!addedMail) {
            socket.mail = email;
        }
        //Guardar el mensaje en la BD
        try {
            let newMsg = { email, timestamp, message };
            msgService.addMessage(newMsg)
                .then(() => logger_1.logger.info(`Mensaje Agregado`))
                .catch((err) => logger_1.loggerError.error(err));
        }
        catch (error) {
            logger_1.loggerError.error(error);
        }
        //Emit para mostrar en la lista
        io.emit('new message', { email, timestamp, message });
    });
    socket.on('disconnect', () => {
        console.log(`Disconnected ${idSock}`);
    });
});
//------------------
server.listen(exports.puerto, () => {
    //loggerWarn.warn(`Servidor escuchando en puerto ${puerto} PID Worker ${process.pid}`);
    logger_1.logger.info(`Servidor escuchando en puerto ${exports.puerto} PID Worker ${process.pid}`);
}).on("error", (err) => {
    logger_1.loggerError.error(err);
    logger_1.logger.error(err);
});
