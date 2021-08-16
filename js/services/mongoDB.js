"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const configs_1 = require("../config/configs");
// BRING IN YOUR SCHEMAS & MODELS
require('../models/schemas/productos.schema');
require('../models/schemas/users.schema');
require('../models/schemas/auth.schema');
const dbURI = configs_1.configSystem.DB_URI;
mongoose_1.default.connect(dbURI, {
    useNewUrlParser: (/true/i).test(configs_1.configSystem.DB_USE_NEW_URL_PARSER),
    useUnifiedTopology: (/true/i).test(configs_1.configSystem.DB_USE_UNIFIED_TOPOLOGY)
}, error => {
    if (error)
        throw new Error(`Error en la conexión a la BD ${error}`);
    console.log(error);
});
// Eventos
mongoose_1.default.connection.on('connected', function () {
    console.log('Conexión con Mongoose abierta con: ' + dbURI);
});
mongoose_1.default.connection.on('error', function (err) {
    console.log('Conexión con Mongoose error: ' + err);
});
mongoose_1.default.connection.on('disconnected', function () {
    console.log('Conexión con Mongoose desconectada');
});
process.on('SIGINT', function () {
    mongoose_1.default.connection.close(function () {
        console.log('Conexión con Mongoose desconectada por culminación de la app');
        process.exit(0);
    });
});
