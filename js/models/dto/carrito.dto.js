"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carritoDTO = void 0;
class carritoDTO {
    constructor(id, prods, direccionEntrega, timestamp) {
        this.idUsuario = id;
        this.productos = prods;
        this.direccionEntrega = direccionEntrega;
        this.timestamp = timestamp;
    }
}
exports.carritoDTO = carritoDTO;
