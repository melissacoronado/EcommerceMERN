import express, {Application, Request, Response, NextFunction } from 'express'
import { AuthController } from "../controllers/auth.controller";
import { CarritoController } from '../controllers/carrito.controller';

export class RoutesCarrito { 
    
    public cartController: CarritoController = new CarritoController() 
    public authController: AuthController = new AuthController() 
    
    public routes(app: Application): void {   
        
        app.route('/carrito')
        //.get(this.authController.isLoggedIn, this.cartController.showCarrito)
        .post(this.authController.isLoggedIn, this.cartController.addproductoCarrito)
        .delete(this.authController.isLoggedIn, this.cartController.deleteProductCarrito);

        app.route('/carrito/:id')
        .get(this.authController.isLoggedIn, this.cartController.findCarritoByUser)
        .delete(this.authController.isLoggedIn, this.cartController.deleteAllCarritoByUser)
        /*.patch(this.authController.isLoggedIn, this.productController.updateProduct)
        .delete(this.authController.isLoggedIn, this.productController.deleteProduct);*/
    }
    
}