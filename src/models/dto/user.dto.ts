export class userDTO {
    email: string;
    password: string;
    nombre: string;
    apellido: string;
    direccion: string;
    edad: string;
    telefono: string;
    avatar: string;
    //token: string;

    constructor(email: string, password: string, name: string, lastName: string, direccion: string, 
        edad: string, telefono: string, avatar: string/*, token: string*/){
        this.email = email;
        this.password = password;
        this.nombre = name;
        this.apellido = lastName;
        this.direccion = direccion;
        this.edad = edad;
        this.telefono = telefono;
        this.avatar = avatar;
        //this.token = token;
    }
}