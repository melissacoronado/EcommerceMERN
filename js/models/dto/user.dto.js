"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDTO = void 0;
class userDTO {
    //token: string;
    constructor(email, password, name, lastName, direccion, edad, telefono, avatar /*, token: string*/) {
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
exports.userDTO = userDTO;
