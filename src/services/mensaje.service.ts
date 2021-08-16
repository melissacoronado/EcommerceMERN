
import { mensajeModel } from '../models/schemas/mensaje.schema'
import { logger, loggerError } from '../helper/logger';
import { mensajeDTO } from '../models/dto/mensajes.dto';


interface IChatMsg{  
    //Propiedades
    //listaProductos:productosDTO[]
    //Metodos    
    addMessage(msg: mensajeDTO): void;
    getMessages(): void;
}

export class MensajeService implements  IChatMsg{
    getMessages = async () => {
        try{
            return await mensajeModel.find().lean().exec();            
        }catch(error){
            throw error
        }
    }
      
    addMessage = async (msg: mensajeDTO) => 
    {
        try{            
            const newMsg = new mensajeModel(msg)
            await newMsg.save()
            .then(() => logger.info(`Mensaje Agregado`))
            .catch( (err: any) => loggerError.error(err));
        }catch(error){            
            throw error
        }
    }
}