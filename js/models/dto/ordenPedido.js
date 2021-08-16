"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordenPedidoDTO = void 0;
class ordenPedidoDTO {
    constructor(idUsuario, productos, estado, totalOrden, idPedido) {
        this.idPedido = idPedido;
        this.idUsuario = idUsuario;
        this.productos = productos;
        this.estado = estado;
        this.totalOrden = totalOrden;
    }
}
exports.ordenPedidoDTO = ordenPedidoDTO;
