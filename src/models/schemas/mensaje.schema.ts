import * as mongoose from 'mongoose';
import { ItemCarritoSchema } from './itemSchema';

const mensajeCollection = 'mensaje';
export const MensajeSchema = new mongoose.Schema({   
    email: {
        type: String,
        required: true
    },
    timestamp: Date,
    estado: {
        type: String
    },
    message: {
        type: String,
        required: true
    }
});

export const mensajeModel = mongoose.model(mensajeCollection, MensajeSchema);