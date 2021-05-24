import * as mongoose from 'mongoose';

const authCollection = 'autorizacion';
export const AuthSchema = new mongoose.Schema({
    email: {
        type: String,
        required: 'Ingrese email'
    },
    password: {
        type: String,
        required: 'Ingrese contraseña'       
    }
});

export const authModel = mongoose.model(authCollection, AuthSchema);