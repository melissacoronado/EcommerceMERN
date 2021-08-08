import { Request, Response } from 'express';
import { carritoDTO } from '../models/dto/carrito.dto';
import { itemCarritoDTO } from '../models/dto/itemCarrito.dto';
import { productosDTO } from '../models/dto/productos.dto';
import { CarritoService } from '../services/carrito.service';
import { ProductosService } from '../services/productos.service';

let CartService = new CarritoService()
let ProductoService = new ProductosService()

export class CarritoController{
    public async showCarrito (req: Request, res: Response) {  
        try{              
            const carrito =  await CartService.showCarrito()       
            if (carrito.length == 0){
                res.status(404).json({error : 'No hay productos cargados en el carrito de compras.'})
                return;
            }else{
                res.status(200).json(carrito);
            }       
        }catch(error){  
            console.log(error);          
            res.status(500).json({Respuesta: "Error de sistema!"}) 
        } 
    }

    public async findCarritoByUser (req: Request, res: Response) {  
        try{              
            const idUsuario: string = req.params.idUsuario //Viene de la url/1 y el + para parsear a numero  
            const carrito: carritoDTO =  await CartService.findCarritoByUser(idUsuario);
            if(!carrito)
            {
                res.status(404).json({error : 'usuario no posee carrito.'})
            }  
            res.status(200).json(carrito);
        }catch(error){  
            console.log(error);          
            res.status(500).json({Respuesta: "Error de sistema!"}) 
        }
    }

    public async addproductoCarrito (req: Request, res: Response) {  
        try{              
            const { id, cantidad, idUsuario } = req.body  
            if (!(id && cantidad && idUsuario)) {
                res.status(400).send("Datos requeridos: id, cantidad, idUsuario.");
            }  
            
            const productoAgregar: productosDTO = await ProductoService.showProductById(id);
            if (!productoAgregar) {
                res.status(400).send("Producto a agregar no existe, verifique.");
            }  

            if (cantidad < 0 || cantidad > 10000) {
                res.status(400).send("Cantidad no permitida, verifique.");
            }

            if (cantidad > productoAgregar.stock) {
                res.status(400).send("Cantidad ingresada mayor que el stock disponible, verifique.");
            }

            if (productoAgregar.stock < cantidad) {
                res.status(400).send(`No contamos con stock suficiente. Disponibles ${productoAgregar.stock}.`);
            }

            let userLogin = (<any>req).user;
            console.log('userLogin' + userLogin);

            await CartService.addProductCarrito(productoAgregar, cantidad, idUsuario)  
            
            res.status(200).json(CartService.findCarritoByUser(idUsuario));   
        }catch(error){  
            console.log(error);          
            res.status(500).json({Respuesta: "Error de sistema!"}) 
        }  
    }

    public async deleteAllCarritoByUser (req: Request, res: Response) {     
        try{           
            const idUsuario: string = req.params.idUsario 
            const carrito: carritoDTO =  await CartService.findCarritoByUser(idUsuario);
            if(!carrito)
            {
                res.status(404).json({error : 'Usuario no posee carrito.'})
            }

            await CartService.deleteCarrito(idUsuario)
            res.status(200).send('Carrito Eliminado.')  
        }catch(error){  
            console.log(error);          
            res.status(500).json({Respuesta: "Error de sistema!"}) 
        }
    }

    public async deleteProductCarrito (req: Request, res: Response) {     
        try{           
            const { idproducto, idUsuario, cantidad } = req.body;

            const carrito: carritoDTO =  await CartService.findCarritoByUser(idUsuario);
            if(!carrito)
            {
                res.status(404).json({error : 'Usuario no posee carrito.'})
            }

            const productoAgregar: productosDTO = await ProductoService.showProductById(idproducto);
            if (!productoAgregar) {
                res.status(400).send("Producto a agregar no existe, verifique.");
            } 

            if (cantidad < 0 || cantidad > 10000) {
                res.status(400).send("Cantidad no permitida, verifique.");
            }
//Faltaria manejo de borrar cierta cantidad y no todo el producto

            const indexproductoCarrito: number = await CartService.existeProductoCarrito(idproducto, carrito);
            if(indexproductoCarrito != -1)
            {
                //Borrar item del carrito
                await CartService.deleteProductoCarrito(carrito, indexproductoCarrito);
            }

            res.status(200).send('Producto eliminado de Carrito.')  
        }catch(error){  
            console.log(error);          
            res.status(500).json({Respuesta: "Error de sistema!"}) 
        }
    }
}