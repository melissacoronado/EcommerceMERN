import * as mongoose from 'mongoose';

const itemCollection = 'direccionEntregaCarrito';
export const DireccionEntregaCarritoSchema = new mongoose.Schema({   
    calle : {
        type: String,
        required: true
    },
    altura: {
        type: Number,
        required: true
    },
    cp: {
        type: String,
        required: true,
    },
    piso : {
        type: String
    },
    departamento : {
        type: String
    }
});