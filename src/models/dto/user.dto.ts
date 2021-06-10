export class userDTO {
    email: string;
    password: string;
    name: string;
    lastName: string;
    direccion: string;
    edad: string;
    telefono: string;
    avatar: string;

    constructor(email: string, password: string, name: string, lastName: string, direccion: string, edad: string, telefono: string, avatar: string){
        this.email = email;
        this.password = password;
        this.name = name;
        this.lastName = lastName;
        this.direccion = direccion;
        this.edad = edad;
        this.telefono = telefono;
        this.avatar = avatar;
    }
}