import express, {Application, Request, Response, NextFunction } from 'express'
import { AuthController } from '../controllers/auth.controller';
import { sendMail } from '../helper/enviarMail';
import { usuariomail } from '../server'

export class RoutesAuth { 
    //public authController: AuthController = new AuthController() 

    public routes(app: Application, passport: any): void {   
        
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
            let userLogin = (<any>req).user;
            res.status(200).json('Inicio Sesión OK');
            //res.render('partials/main', {layout : 'home', userEmail: userLogin.email});
        })

        app.get('/faillogin', (req,res) => {
            res.render('partials/main', {layout : 'errLogin' });
        })

        app.post('/logout', (req: Request, res: Response) => {
            //console.log('/logout');
            req.session.destroy(function (err) {//No esta entrando
                //console.log('session.destroy');
                res.status(200).json('Sesión Finalizada');
                //res.render('partials/main', {layout : 'login' });
            });
            res.status(200).json('Sesión Finalizada...');
            //res.render('partials/main', {layout : 'login' });
        })  

        app.get('/register',(req: Request, res: Response) => {
            res.render('partials/main', {layout : 'register' });
        })

        app.post('/register', passport.authenticate('register', 
        /*function(err:any, user:any, info:any) {
            console.log("authenticate");
            console.log(err);
            console.log(user);
            console.log(info);
        },*/
        { failureRedirect: '/failregister' }),(req: Request, res: Response) => {
            let userLogin = (<any>req).user;
            
            const mailOptions2 = {
                from: 'Ecommerce Nuevo Usuario',
                to: usuariomail,
                subject: "Nuevo Registro",
                html: `<p>Usuario: ${userLogin.name} ${userLogin.lastName}</p></br>
                <p>Edad: ${userLogin.name}</p></br>
                <p>Dirección: ${userLogin.direccion}</p></br> `
            }
            sendMail(mailOptions2);
            
            res.status(200).json('Usuario registrado con exito');
            //res.render('partials/main', {layout : 'home', userEmail: userLogin.email});
        })

        app.get('/failregister', (req,res) => {
            res.render('partials/main', {layout : 'errorRegister' });
        })
    }
}
