import * as mongoose from 'mongoose';
import { ItemCarritoSchema } from './itemSchema';

const carritoCollection = 'carrito';
export const CarritoSchema = new mongoose.Schema({   
    idUsuario: {
        type: String,
        required: 'IdUsuario requerido'
    },
    productos: [ItemCarritoSchema]
});

export const carritoModel = mongoose.model(carritoCollection, CarritoSchema);