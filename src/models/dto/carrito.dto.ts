import { direccionEntregaCarritoDTO } from "./direccionEntregaCarrito";
import { itemCarritoDTO } from "./itemCarrito.dto";

export class carritoDTO {    
    idUsuario: string;
    productos: itemCarritoDTO[];
    direccionEntrega: direccionEntregaCarritoDTO;
    timestamp: Date;

    constructor(id: string, prods: itemCarritoDTO[], direccionEntrega: direccionEntregaCarritoDTO, timestamp: Date){
        this.idUsuario = id;
        this.productos = prods;
        this.direccionEntrega = direccionEntrega;
        this.timestamp = timestamp;
    }
}