import * as mongoose from 'mongoose';
import { ItemCarritoSchema } from './itemSchema';

const ordenPedidoCollection = 'ordenPedido';
export const OrdenPedidoSchema = new mongoose.Schema({   
    /*orderId: {
        type: String
    },*/
    idUsuario: {
        type: String,
        required: true
    },
    productos: [ItemCarritoSchema],
    timestamp: Date,
    estado: {
        type: String
    },
    totalOrden: {
        type: Number
    }
});

export const ordenPedidoModel = mongoose.model(ordenPedidoCollection, OrdenPedidoSchema);