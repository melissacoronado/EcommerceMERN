"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productosDTO = void 0;
class productosDTO {
    constructor(timestamp, nombre, codigo, foto, precio, stock, descripcion) {
        this.timestamp = timestamp;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.codigo = codigo;
        this.foto = foto;
        this.precio = precio;
        this.stock = stock;
    }
}
exports.productosDTO = productosDTO;
