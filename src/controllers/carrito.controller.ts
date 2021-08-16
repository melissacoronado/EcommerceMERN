import { Request, Response } from 'express';
import { carritoDTO } from '../models/dto/carrito.dto';
import { userDTO } from '../models/dto/user.dto';
import { productosDTO } from '../models/dto/productos.dto';
import { CarritoService } from '../services/carrito.service';
import { ProductosService } from '../services/productos.service';
import { UserService } from '../services/user.service';
import { logger, loggerError } from '../helper/logger';

let CartService = new CarritoService()
let ProductoService = new ProductosService()
let UsersService = new UserService()

export class CarritoController{
    public async showAllCarrito (req: Request, res: Response) {  
        try{              
            const carrito =  await CartService.showAllCarrito()       
            if (carrito.length == 0){
                res.status(404).json({error : 'No hay carritos de compras para ningún usuario.'})
                return;
            }else{
                res.status(200).json(carrito);
            }       
        }catch(error){  
            loggerError.error(error);       
            res.status(500).json({Respuesta: "Error de sistema!"}) 
        } 
    }

    public async findCarritoByUser (req: Request, res: Response) {  
        try{              
            const idUsuario: string = req.params.id //Viene de la url/1 y el + para parsear a numero  

            //Chequear si usuario existe
            const usuarioCarrito: userDTO = await UsersService.findUserById(idUsuario);
            if (!usuarioCarrito) {
                res.status(400).send("Usuario no existe, verifique.");
            } 
            //Chequear si usuario posee carrito
            const carrito: carritoDTO =  await CartService.findCarritoByUser(idUsuario);
            if(!carrito)
            {
                res.status(404).send('Usuario no posee carrito.')
            }else{
                res.status(200).json(carrito);
            }
        }catch(error){  
            loggerError.error(error);          
            res.status(500).json({Respuesta: "Error de sistema!"}) 
        }
    }

    public async addproductoCarrito (req: Request, res: Response) {  
        try{             
            const { idProducto, cantidad, idUsuario, direccionEntrega } = req.body  
            if (!(idProducto && cantidad && idUsuario && direccionEntrega)) {
                res.status(400).send("Datos requeridos: idProducto, cantidad, idUsuario, direccionEntrega.");
            } 
            //Chequear si usuario existe
            const usuarioCarrito: userDTO = await UsersService.findUserById(idUsuario);
            if (!usuarioCarrito) {
                res.status(400).send("Usuario no existe, verifique.");
            } 
            
            //Chequear si producto existe
            const productoAgregar: productosDTO = await ProductoService.showProductById(idProducto);
            if (!productoAgregar) {
                res.status(400).send("Producto a agregar no existe, verifique.");
            }  

            if (cantidad < 0 || cantidad > 10000) {
                res.status(400).send("Cantidad no permitida, verifique.");
            }

            if (productoAgregar.stock < cantidad) {
                res.status(400).send(`No contamos con stock suficiente. Disponibles ${productoAgregar.stock}, verifique.`);
            }

            let carritoCreado = await CartService.addProductCarrito(productoAgregar, cantidad, idUsuario, direccionEntrega)  
            
            res.status(200).json({Respuesta: "Carrito creado/actualizado con éxito.", Carrito: carritoCreado});   
        }catch(error){  
            loggerError.error(error);         
            res.status(500).json({Respuesta: "Error de sistema!"}) 
        }  
    }

    public async deleteAllCarritoByUser (req: Request, res: Response) {     
        try{           
            const idUsuario: string = req.params.id 
            //Chequear si usuario existe
            const usuarioCarrito: userDTO = await UsersService.findUserById(idUsuario);
            if (!usuarioCarrito) {
                res.status(400).send("Usuario no existe, verifique.");
            } 
            //Chequear si usuario posee carrito
            const carrito: carritoDTO =  await CartService.findCarritoByUser(idUsuario);
            if(!carrito)
            {
                res.status(404).send('Usuario no posee carrito.')
            }

            await CartService.deleteCarrito(idUsuario)
            res.status(200).send('Carrito Eliminado.')  
        }catch(error){  
            loggerError.error(error);     
            res.status(500).json({Respuesta: "Error de sistema!"}) 
        }
    }

    public async deleteProductCarrito (req: Request, res: Response) {     
        try{           
            const { idProducto, idUsuario } = req.body;
            if (!(idProducto && idUsuario)) {
                res.status(400).send("Datos requeridos: idProducto, idUsuario.");
            } 

            const carrito: carritoDTO =  await CartService.findCarritoByUser(idUsuario);
            if(!carrito)
            {
                res.status(404).send('Usuario no posee carrito.')
            }

            //Chequear si producto existe
            const productoEliminar: productosDTO = await ProductoService.showProductById(idProducto);
            if (!productoEliminar) {
                res.status(400).send("Producto a eliminar no existe, verifique.");
            } 

            const indexproductoCarrito: number = CartService.existeProductoCarrito(idProducto, carrito);
            if(indexproductoCarrito != -1)
            {                
                //Borrar item del carrito
                await CartService.deleteProductoCarrito(carrito, indexproductoCarrito, productoEliminar);
                res.status(200).send('Producto eliminado de Carrito.')  
            }else{
                res.status(400).send("Producto no existe en el Carrito.") 
            }         
        }catch(error){  
            loggerError.error(error);         
            res.status(500).json({Respuesta: "Error de sistema!"}) 
        }
    }
}