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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = exports.userSchema = void 0;
const mongoose = __importStar(require("mongoose"));
const userCollection = 'users';
exports.userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: 'Ingrese email'
    },
    password: {
        type: String,
        required: 'Ingrese contraseña'
    },
    nombre: {
        type: String,
        required: 'Ingrese Nombre'
    },
    apellido: {
        type: String,
        required: 'Ingrese Apellido'
    },
    direccion: {
        type: String
    },
    edad: {
        type: String
    },
    telefono: {
        type: String,
        required: 'Ingrese Teléfono'
    },
    avatar: {
        type: String
    }
});
exports.userModel = mongoose.model(userCollection, exports.userSchema);
