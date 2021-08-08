export class itemCarritoDTO {    
    idProducto: string;
    cantidad: number;
    precio: number;
    total: number;

    constructor(id: string, cantidad: number, precio: number, total: number){
        this.idProducto = id;
        this.cantidad = cantidad;
        this.precio = precio;
        this.total = total;
    }
}