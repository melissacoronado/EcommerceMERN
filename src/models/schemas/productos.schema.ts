import * as mongoose from 'mongoose';

const productsCollection = 'productos';
export const ProductsSchema = new mongoose.Schema({
    timestamp: {
        type: Date
    },
    nombre: {
        type: String,
        required: 'Ingrese nombre'
    },
    descripcion: {
        type: String            
    },
    codigo: {
        type: String            
    },
    fotos: {
        type: [String]            
    },
    precio:{
        type: Number
    },
    stock:{
        type: Number
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

export const productosModel = mongoose.model(productsCollection, ProductsSchema);