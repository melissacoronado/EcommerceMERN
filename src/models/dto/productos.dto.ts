export class productosDTO {
    _id?: string;
    timestamp: Date;
    nombre: string;
    descripcion?: string;
    categoria: string;
    codigo: string;
    foto: string[];
    precio: number;
    stock: number;

    constructor(id: string, timestamp: Date, nombre: string, codigo: string, foto: string[], precio: number, stock: number, categoria: string, descripcion?: string){
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