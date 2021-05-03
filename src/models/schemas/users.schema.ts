import * as mongoose from 'mongoose';

const userCollection = 'usuarios';
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
    }
});

export const userModel = mongoose.model(userCollection, userSchema);