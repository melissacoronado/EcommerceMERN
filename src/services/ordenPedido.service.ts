import { ordenPedidoDTO } from '../models/dto/ordenPedido';
import { ordenPedidoModel } from '../models/schemas/orden.schema'
import { logger, loggerError } from '../helper/logger';

interface IOrdenPedido{  
    //Propiedades
    //listaProductos:productosDTO[]
    //Metodos    
    showPedidos(): void;
    showPedidosByUser(idUsuario: string): void;
    showPedidosByPedido(idPedido: string): void;
    addPedidosByCarritoUser(ordenPedido: ordenPedidoDTO): void;
    completePedidosByPedido(idPedido:string, ordenCompletar: ordenPedidoDTO): void;
    updatePedidoscomplete(idPedido: string, ordenCompletar: ordenPedidoDTO): void;
}

export class OrdenPedidoService implements  IOrdenPedido{
    showPedidos = async () => {
        try{
            return await ordenPedidoModel.find().lean().exec();            
        }catch(error){
            throw error
        }
    }

    showPedidosByUser = async (idUsuario: string) => {
        try{
            return await ordenPedidoModel.find({idUsuario: idUsuario}).exec();        
        }catch(error){
            throw error
        }
    }

    showPedidosByPedido = async (idPedido: string) => {
        try{
            return await ordenPedidoModel.findOne({_id: idPedido}).exec();        
        }catch(error){
            throw error
        }
    }

    addPedidosByCarritoUser = async (ordenPedido: ordenPedidoDTO) => {
        try{            
            const newProd = new ordenPedidoModel(ordenPedido)
            await newProd.save()
            .then(() => logger.info(`Orden generada`))
            .catch( (err: any) => loggerError.error(err));

        }catch(error){            
            throw error
        }
    }

    updatePedidoscomplete = async (idPedido: string, ordenCompletar: ordenPedidoDTO) => {
        try{
            console.log(idPedido + '-- edo: ' + ordenCompletar.estado);
            await ordenPedidoModel.updateOne({_id: idPedido}, { $set:
                {
                    estado: ordenCompletar.estado
                }
            })
            .then(() => logger.info(`Orden Completada`))
            .catch( (err: any) => loggerError.error(err));

        }catch(error){
            throw error;
        }
    }

    completePedidosByPedido = async (idPedido: string, ordenCompletar: ordenPedidoDTO) => {
        try{
            ordenCompletar.estado = "Completada";  
            await this.updatePedidoscomplete(idPedido, ordenCompletar);
        }catch(error){
            throw error
        }
    }

}