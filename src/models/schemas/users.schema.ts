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
    name: {
        type: String,
        required: 'Ingrese Nombre'
    },
    lastName: {
        type: String,
        required: 'Ingrese Apellido'
    },
    direccion: {
        type: String,
        required: 'Ingrese Dirección'
    },
    edad: {
        type: String,
        required: 'Ingrese Edad'
    },
    telefono: {
        type: String,
        required: 'Ingrese Teléfono'
    },
    avatar: {
        type: String,
        required: 'Seleccione Foto Avatar'
    }
});

export const userModel = mongoose.model(userCollection, userSchema);