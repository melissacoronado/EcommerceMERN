import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { userDTO } from '../models/dto/user.dto'
import { logger, loggerError } from '../helper/logger';

let userService = new UserService();
let authService = new AuthService();

export class AuthController{

    public async registerUser (req: Request, res: Response) {              
        const { email, password, nombre, apellido, direccion, edad, telefono, avatar } = req.body   
        //validar Paramteros obligatorios
        if (!(email && password && nombre && apellido && telefono)) {
            res.status(400).send("Datos requeridos: email, password, nombre, apellido, telefono.");
        }

        //Chequear si usuario existe
        let userExits = await userService.findUserByEmail(email); 
        if (userExits) {
            return res.status(409).send("Usuario existe, Por favor inicie sesión.");
        }

        const newUser = {  email, password, nombre, apellido, direccion, edad, telefono, avatar }
        let registredUser = await authService.registerUser(newUser); 

        if(registredUser){
            let token: string = authService.generateToken(registredUser.email);
            res.header("x-auth-token", token).status(201).json({Resultado: 'Usuario creado correctamente', jwt: token});
        }
    }

    public async logInUser(req: Request, res: Response) {  
        try {
            const { email, password } = req.body;
            if (!(email && password)) {
                res.status(400).send("Es obligatorio Email y password");
            }

            const user:userDTO = await userService.findUserByEmail(email);
            if (user ){
                if (await authService.isValidPassword(password, user)) {
                    const token =  authService.generateToken(user.email);                         
                    res.header("x-auth-token", token).status(201).json({Resultado: 'Inicio de sesión Exitoso!', jwt: token});
                }else{
                    res.status(401).send("Credenciales inválidas");
                }
            }else{
                res.status(401).send("Acceso No Autorizado");
            }
            
        }
        catch (err) {
            loggerError.error(err);
        }
    }

    public isLoggedIn = (req: Request, res: Response, next: any) => {
        const token = req.body.token || req.query.token || req.headers["x-access-token"];
        if (!token) {
            return res.status(403).send("Token (JWT) requerido no encontrado!");
        }
        try {
            const decoded = authService.verifyToken(token);
            (<any>req).user = decoded;
            next();            

          } catch (err) {
            loggerError.error(err);
            return res.status(401).send("Token inválido");
          }
    }

    public async logOutUser(req: Request, res: Response) {  
        try {
            //res.clearCookie('x-auth-token').send("Sesión finalizada");    
            const tokenHeader = req.body.token || req.query.token || req.headers["x-access-token"];
            const tkn = await authService.verifyToken(tokenHeader);
            
            const msjLogOut = await authService.logOutUser(tkn.user_id);  
            logger.info(`logOutUser ${await authService.verifyToken(tokenHeader)} `);

            res.status(200).send("Sesión Finalizada");
        }
        catch (err) {
            loggerError.error(err);
        }
    }
    
}