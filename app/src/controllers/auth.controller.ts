import * as mongoose from 'mongoose';
import { ProductsSchema } from '../models/schemas/productos.schema';
import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { userDTO } from '../models/dto/user.dto'

let userService = new UserService()

export class AuthController{
    public async addNewUser (req: Request, res: Response) {                
        const { nombre, apellido, email, password } = req.body  
        //Falta validar que vengan todos los parametros              
        const newUser = new userDTO( nombre, apellido, email, password)
        const userCreated = await userService.newUser(newUser)       

        res.render('partials/main', {layout : 'home', user: newUser.email });
    }

    public async findUser (req: Request, res: Response) {                
        const { email, password } = req.body  

        const user = await userService.findUser(email, password)

        res.render('partials/main', {layout : 'home', user: user.email });
    }

    public isLoggedIn = (req: Request, res: Response, next: any) => {
        console.log('isLoggedIn' + (<any>req).user)
        if ((<any>req).user) {
            next();
        } else {
            res.render('partials/main', {layout : 'login', msj: 'Debe iniciar sesión' });
            //res.status(401).send('Not Logged In');
        }
    }
}