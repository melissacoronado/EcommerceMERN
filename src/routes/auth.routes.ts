import express, {Application, Request, Response, NextFunction } from 'express'
import { AuthController } from '../controllers/auth.controller';

export class RoutesAuth { 
    //public authController: AuthController = new AuthController() 

    public routes(app: Application, passport: any): void {   

        /*app.get('/auth/facebook',passport.authenticate('facebook'));

        app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }),//sucessRedirect: '/home'
        function(req, res) {
            let userLogin = (<any>req).user;
            //console.log(userLogin);
            res.render('partials/main', {layout : 'home', userEmail: userLogin.email});
        });*/
        app.get('/login',(req: Request, res: Response) => {
            //console.log('get(/login');
            res.render('partials/main', {layout : 'login' });
        })

        app.post('/login', passport.authenticate('login', 
        /*function(err:any, user:any, info:any) {
            console.log("authenticate");
            console.log(err);
            console.log(user);
            console.log(info);
        },*/
        { failureRedirect: '/faillogin' }), (req,res) => {
            //res.redirect('/')
            //console.log('post(/login');
            let userLogin = (<any>req).user;
            res.render('partials/main', {layout : 'home', userEmail: userLogin.email});
        })

        app.get('/faillogin', (req,res) => {
            res.render('partials/main', {layout : 'errLogin' });
        })

        app.post('/auth/logout', (req: Request, res: Response) => {
            //console.log('/auth/logout');
            req.session.destroy(function (err) {
                //console.log('session.destroy');
                res.redirect('/auth/login'); 
            });
        })  

        app.get('/register',(req: Request, res: Response) => {
            console.log('get(/login');
            res.render('partials/main', {layout : 'register' });
        })
    }
}
