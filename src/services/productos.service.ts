import { productosDTO } from '../models/dto/productos.dto';
import { productosModel } from '../models/schemas/productos.schema'
import { logger, loggerError } from '../helper/logger';


interface IProducto{  
    //Propiedades
    listaProductos:productosDTO[]
    //Metodos    
    showProducts(): void;
    showProductById(idprod: string): void;
    showProductByNombre(nombreProd: string): void;
    showProductByPrice(min: number, max: number): void;
    addProduct(producto: productosDTO): void;
    updateProduct(idProd: string, prodDto: productosDTO): void;
    deleteProduct(idProd: string):void
}

export class ProductosService implements  IProducto{
    listaProductos:productosDTO[] = []

    showProducts = async () => {
        try{
            return await productosModel.find().lean().exec();            
        }catch(error){
            throw error
        }
    }

    showProductById = async (idProd: string) => {
        try{
           return await productosModel.findOne({_id: idProd}).exec();
        }catch(error){
            throw error
        }
    }

    showProductByNombre = async (nombreProd: string) => {
        try{
            return await productosModel.find({nombre: new RegExp('.*'+nombreProd+'.*', "i")}).exec();
        }catch(error){
            throw error
        }
    }

    showProductByPrice = async (min: number, max: number) => {
        try{
           return await productosModel.find({ precio: { $gt : min , $lt : max } }).exec();
        }catch(error){
            throw error
        }
    }

    addProduct = async (producto: productosDTO) => {
        try{            
            const newProd = new productosModel(producto)
            await newProd.save()
            .then(() => logger.info(`Producto Agregado`))
            .catch( (err: any) => loggerError.error(err));

        }catch(error){            
            throw error
        }
    }

    updateProduct = async (idProd: string, prodDto: productosDTO) => {
        try{
            await productosModel.updateOne({_id: idProd}, { $set:{
                timestamp: new Date(Date.now()),
                nombre: prodDto.nombre,
                descripcion: prodDto.descripcion,
                codigo: prodDto.codigo,
                foto: prodDto.foto,
                precio: prodDto.precio,
                stock: prodDto.stock
                }
            })
            .then(() => logger.info(`Producto Actualizado`))
            .catch( (err: any) => loggerError.error(err));

        }catch(error){
            throw error
        }
    }

    deleteProduct = async (idProd: string) => {
        try{
            await productosModel.deleteOne({_id: idProd});
            logger.info(`Producto Eliminado`)
        }catch(error){
            throw error
        }
    }

}