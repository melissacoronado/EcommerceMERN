import * as mongoose from 'mongoose';

const userCollection = 'users';
export const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: 'Ingrese email'
    },
    password: {
        type: String,
        required: 'Ingrese contraseña'       
    },
    nombre: {
        type: String,
        required: 'Ingrese Nombre'
    },
    apellido: {
        type: String,
        required: 'Ingrese Apellido'
    },
    direccion: {
        type: String
    },
    edad: {
        type: String
    },
    telefono: {
        type: String,
        required: 'Ingrese Teléfono'
    },
    avatar: {
        type: String
    }
});

export const userModel = mongoose.model(userCollection, userSchema);