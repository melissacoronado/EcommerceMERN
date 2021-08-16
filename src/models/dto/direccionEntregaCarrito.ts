export class direccionEntregaCarritoDTO {    
    calle: string;
    altura: number;
    cp: string;
    piso: string;
    departamento: string;

    constructor(calle: string, altura: number, cp: string, piso: string, departamento: string){
        this.calle = calle;
        this.altura = altura;
        this.cp = cp;
        this.piso = piso;
        this.departamento = departamento;
    }
}