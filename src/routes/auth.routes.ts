import express, {Application, Request, Response, NextFunction } from 'express'
//import { ProductController } from "../controllers/products.controller";
//import { passport } from '../app'

export class RoutesAuth { 

    public routes(app: Application, passport: any): void {   
        //public productController: ProductController = new ProductController() 


        app.get('/auth/facebook',passport.authenticate('facebook'));

        app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }),
        function(req, res) {
            console.log(res);
            res.render('partials/main', {layout : 'home', user: "Usuario facebook" });
        });
    }
}
