import {Application, Request, Response, NextFunction } from 'express'
import { AuthController } from '../controllers/auth.controller';

export class RoutesAuth { 
    public authController: AuthController = new AuthController();

    public routes(app: Application): void {  

        app.route('/register')        
        .post(this.authController.registerUser);

        app.route('/login')
        .post(this.authController.logInUser);

        app.route('/logout')
        .post(this.authController.isLoggedIn, this.authController.logOutUser);

    }
}
