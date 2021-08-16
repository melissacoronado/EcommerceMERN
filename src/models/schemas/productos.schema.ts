import * as mongoose from 'mongoose';

const productsCollection = 'productos';
export const ProductsSchema = new mongoose.Schema({
    timestamp: {
        type: Date
    },
    nombre: {
        type: String,
        required: 'Nombre requerido'
    },
    descripcion: {
        type: String            
    },
    categoria: {
        type: String            
    },
    codigo: {
        type: String,
        required: 'Código requerido'        
    },
    fotos: Array,
    precio:{
        type: Number,
        required: 'Precio requerido'
    },
    stock:{
        type: Number,
        required: 'Stock requerido'
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

export const productosModel = mongoose.model(productsCollection, ProductsSchema);