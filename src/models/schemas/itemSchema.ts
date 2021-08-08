import * as mongoose from 'mongoose';

const itemCollection = 'itemCarrito';
export const ItemCarritoSchema = new mongoose.Schema({   
    idProducto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Producto",
    },
    cantidad: {
        type: Number,
        required: true,
        min: [1, "Cantidad no puede ser menor a 1."],
    },
    precio: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    }
});

export const itemCarritoModel = mongoose.model(itemCollection, ItemCarritoSchema);