import {Application } from 'express'
import { OrdenPedidoController } from "../controllers/ordenPedido.controller";
import { AuthController } from '../controllers/auth.controller';

export class RoutesOrdenPedido { 
    
    public ordenPedidoController: OrdenPedidoController = new OrdenPedidoController() 
    public authController: AuthController = new AuthController() 
    
    public routes(app: Application): void {   
        
        app.route('/orden')
        .get(this.authController.isLoggedIn, this.ordenPedidoController.showAllOrdenPedidos)
        .post(this.authController.isLoggedIn, this.ordenPedidoController.completeOrdenPedidoByPedido);
        

        app.route('/orden/:id')
        .get(this.authController.isLoggedIn, this.ordenPedidoController.findOrdenPedidoByPedido)
        .post(this.authController.isLoggedIn, this.ordenPedidoController.addNewOrdenPedido);

        //app.route('/orden/new/')
        //.post(this.authController.isLoggedIn, this.ordenPedidoController.addNewOrdenPedido);

        app.route('/orden/user/:id')
        .get(this.authController.isLoggedIn, this.ordenPedidoController.findOrdenPedidoByUser);
    }    
}