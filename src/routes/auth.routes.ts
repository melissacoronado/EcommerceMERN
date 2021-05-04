import express, {Application, Request, Response, NextFunction } from 'express'
//import { ProductController } from "../controllers/products.controller";
//import { passport } from '../app'

export class RoutesAuth { 

    public routes(app: Application, passport: any): void {   
        //public productController: ProductController = new ProductController() 


        app.get('/auth/facebook',passport.authenticate('facebook'));

        app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }),
        function(req, res) {
            //console.log('/auth/facebook/callback');
            //res.redirect('/productos');
            let userLogin = (<any>req).user;
            res.render('partials/main', {layout : 'home', user: userLogin.name });
        });

        app.post('/auth/logout', (req: Request, res: Response) => {
            console.log('/auth/logout');
            req.session.destroy(function (err) {
                console.log('session.destroy');
                res.redirect('/auth/login'); 
            });
        })

        app.get('/auth/login',(req: Request, res: Response) => {
            res.render('partials/main', {layout : 'login' });
        })


    }
}
