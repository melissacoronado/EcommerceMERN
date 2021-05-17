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
exports.productosModel = exports.ProductsSchema = void 0;
const mongoose = __importStar(require("mongoose"));
const productsCollection = 'productos';
exports.ProductsSchema = new mongoose.Schema({
    timestamp: {
        type: Date
    },
    nombre: {
        type: String,
        required: 'Ingrese nombre'
    },
    descripcion: {
        type: String
    },
    codigo: {
        type: String
    },
    foto: {
        type: Number
    },
    precio: {
        type: Number
    },
    stock: {
        type: Number
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});
exports.productosModel = mongoose.model(productsCollection, exports.ProductsSchema);
