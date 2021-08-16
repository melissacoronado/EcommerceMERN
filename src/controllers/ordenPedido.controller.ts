import { Request, Response } from 'express';
import { ordenPedidoDTO } from '../models/dto/ordenPedido';
import { OrdenPedidoService } from '../services/ordenPedido.service';
import { UserService } from '../services/user.service';
import { CarritoService } from '../services/carrito.service';
import { logger, loggerError, loggerWarn } from '../helper/logger';
import { userDTO } from '../models/dto/user.dto';
import { carritoDTO } from '../models/dto/carrito.dto';
import { itemCarritoDTO } from '../models/dto/itemCarrito.dto';
import { sendGMail } from '../helper/enviarMail';

let ordenPedidoService = new OrdenPedidoService();
let UsersService = new UserService();
let CartService = new CarritoService();

export class OrdenPedidoController{
    public async showAllOrdenPedidos (req: Request, res: Response) {  
        try{              
            const ordenes =  await ordenPedidoService.showPedidos();       
            if (ordenes.length == 0){
                res.status(404).send('No hay ordenes disponibles.')
            }else{
                res.status(200).json(ordenes);
            }       
        }catch(error){  
            loggerError.error(error);       
            res.status(500).json({Respuesta: "Error de sistema!"}) 
        } 
    }

    public async findOrdenPedidoByPedido (req: Request, res: Response) {  
        try{              
            const idPedido: string = req.params.id;
            const pedido: ordenPedidoDTO =  await ordenPedidoService.showPedidosByPedido(idPedido);
            if(!pedido)
            {
                res.status(404).send('Pedido no encontrado.')
            }else{
                res.status(200).json(pedido);
            }
        }catch(error){  
            loggerError.error(error);        
            res.status(500).json({Respuesta: "Error de sistema!"}) 
        }
    }

    public async findOrdenPedidoByUser (req: Request, res: Response) {  
        try{              
            const idUsuario: string = req.params.id;

            //Chequear si usuario existe
            const usuarioCarrito: userDTO = await UsersService.findUserById(idUsuario);
            if (!usuarioCarrito) {
                res.status(400).send("Usuario no existe, verifique.");
            } 
            //Chequear si usuario posee Ordenes
            const ordenesUsuario: ordenPedidoDTO =  await ordenPedidoService.showPedidosByUser(idUsuario);
            if(!ordenesUsuario)
            {
                res.status(404).send('Usuario no posee ordenes.')
            }else{
                res.status(200).json(ordenesUsuario);
            }
        }catch(error){  
            loggerError.error(error);          
            res.status(500).json({Respuesta: "Error de sistema!"}) 
        }
    }

    public async addNewOrdenPedido (req: Request, res: Response) {
        try{  
            const idUsuario: string = req.params.id;
            if (!(idUsuario)) {
                res.status(400).send("Datos requeridos: idUsuario.");
            } 

            //Chequear si usuario existe
            const usuarioCarrito: userDTO = await UsersService.findUserById(idUsuario);
            if (!usuarioCarrito) {
                res.status(400).send("Usuario no existe, verifique.");
            } 

            //Chequear si usuario posee carrito
            const carrito: carritoDTO =  await CartService.findCarritoByUser(idUsuario);
            if(!carrito)
            {
                res.status(404).send('Usuario no posee carrito para generar orden de pedido.')
            }else{
                //Armamos datos para generar orden
                const estado: string = "generada";
                let totalOrden: number = 0;
                carrito.productos.forEach(element => {
                    totalOrden = totalOrden + parseFloat(element.total.toString());
                });

                const productos: itemCarritoDTO[] = carrito.productos;
                const newOrden: ordenPedidoDTO = { idUsuario, productos, estado, totalOrden };

                await ordenPedidoService.addPedidosByCarritoUser(newOrden);     
                res.status(200).json(`Orden ${estado} con éxito`);
            }
        }catch(error){  
            loggerError.error(error);        
            res.status(500).json({Respuesta: "Error de sistema!"}) 
        }
    }

    public async completeOrdenPedidoByPedido (req: Request, res: Response) {
        const { idPedido } = req.body  
        if (!idPedido) {
            res.status(400).send("Datos requeridos: idPedido.");
        } 
        
        //Chequear si orden existe
        const ordenCompletar: ordenPedidoDTO = await ordenPedidoService.showPedidosByPedido(idPedido);
        if (!ordenCompletar) {
            res.status(400).send("Orden no existe, verifique.");
        }  
        
        if(ordenCompletar.estado.toLocaleLowerCase() !== "generada"){
            res.status(400).send("Orden no esta en estado generada, no se puede completar.");
        }else{
            ordenPedidoService.completePedidosByPedido(idPedido, ordenCompletar);
            //Enviar mail
            const userCliente: userDTO = await UsersService.findUserById(ordenCompletar.idUsuario);
            if(userCliente){
                sendGMail({
                    from: 'Servidor Node.js',
                    to: userCliente.email,
                    subject: `Su orden Nro. ${ordenCompletar.idPedido!} ha sido completada!`,
                    html: "<h3>Su orden ha sido completada con éxito!</h3>"
                });
            }else{
                loggerWarn.warn(`No se encontro usuario para enviar mail`);
            }
            res.status(200).json('Orden completada con exito');
        }
    }
}