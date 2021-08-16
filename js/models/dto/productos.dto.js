"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productosDTO = void 0;
class productosDTO {
    constructor(id, timestamp, nombre, codigo, foto, precio, stock, categoria, descripcion) {
        this._id = id;
        this.timestamp = timestamp;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.codigo = codigo;
        this.foto = foto;
        this.precio = precio;
        this.stock = stock;
        this.categoria = categoria;
    }
}
exports.productosDTO = productosDTO;
