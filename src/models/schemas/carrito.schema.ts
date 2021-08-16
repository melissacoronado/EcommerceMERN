import * as mongoose from 'mongoose';
import { DireccionEntregaCarritoSchema } from './direccionEntrega.schema';
import { ItemCarritoSchema } from './itemSchema';

const carritoCollection = 'carrito';
export const CarritoSchema = new mongoose.Schema({   
    idUsuario: {
        type: String,
        required: 'IdUsuario requerido'
    },
    productos: [ItemCarritoSchema],
    direccionEntrega: DireccionEntregaCarritoSchema,
    timestamp: Date
});

export const carritoModel = mongoose.model(carritoCollection, CarritoSchema);