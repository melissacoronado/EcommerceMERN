export class productosDTO {
    timestamp: Date;
    nombre: string;
    descripcion?: string;
    codigo: string;
    foto: string;
    precio: number;
    stock: number;

    constructor(timestamp: Date, nombre: string, codigo: string, foto: string, precio: number, stock: number, descripcion?: string){
        this.timestamp = timestamp;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.codigo = codigo;
        this.foto = foto;
        this.precio = precio;
        this.stock = stock;
    }
}