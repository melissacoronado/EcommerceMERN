import { itemCarritoDTO } from "./itemCarrito.dto";

export class carritoDTO {    
    idUsuario: string;
    productos: itemCarritoDTO[];

    constructor(id: string, prods: itemCarritoDTO[]){
        this.idUsuario = id;
        this.productos = prods;
    }
}