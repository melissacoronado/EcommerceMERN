import { itemCarritoDTO } from "./itemCarrito.dto";

export class ordenPedidoDTO {  
    idPedido?: string;  
    idUsuario: string;
    productos: itemCarritoDTO[];
    estado: string;
    totalOrden: number;

    constructor(idUsuario: string, productos: itemCarritoDTO[], estado: string, totalOrden: number, idPedido?: string){
        this.idPedido = idPedido;
        this.idUsuario = idUsuario;
        this.productos = productos;
        this.estado = estado;
        this.totalOrden = totalOrden;
    }
}