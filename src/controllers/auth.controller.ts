import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { userDTO } from '../models/dto/user.dto'

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
        let userExits = await userService.findUser(email); 
        console.log(userExits);  
        if (userExits) {
            return res.status(409).send("Usuario existe, Por favor inicie sesión.");
        }

        const newUser = {  email, password, nombre, apellido, direccion, edad, telefono, avatar }
        let registredUser = await authService.registerUser(newUser); 

        if(registredUser){
            let token: string = authService.generateToken(registredUser.email);
            //res.status(201).json(registredUser);
            res.header("x-auth-token", token).status(201).json({Resultado: 'Usuario creado correctamente', jwt: token});
        }
    }

    public async addNewUser (req: Request, res: Response) {                
        const { nombre, apellido, email, password, direccion, edad, telefono, avatar } = req.body  
        //Falta validar que vengan todos los parametros              
        const newUser = new userDTO( nombre, apellido, email, password, direccion, edad, telefono, avatar)
        const userCreated = await userService.newUser(newUser)       
        res.status(200).json('Inicio Sesión correcto') 
        //res.render('partials/main', {layout : 'home', user: newUser.email });
    }

    public async loginUser(req: Request, res: Response) {  
        try {
            const { email, password } = req.body;
            if (!(email && password)) {
                res.status(400).send("Es obligatorio Email y password");
            }

            const user = await userService.findUser(email);
            console.log('usuarioPass' + user.password);
            console.log('isValidPassword ' +  userService.isValidPassword(user, user.password));
            //VOY AQUI - VALIDAR PASSW LOGIN
            if (user && (await authService.isValidPassword(user, user.password))) {
                // Create token
                const token =  authService.generateToken(user.email);
                          
                res.header("x-auth-token", token).status(201).json({Resultado: 'Inicio de sesión Exitoso!', jwt: token});
              }
              res.status(400).send("Credenciales inválidas");
        }
        catch (err) {
            console.log(err);
        }
    }

    //va?
    public async findUser (req: Request, res: Response) {                
        const { email, password } = req.body  

        const user = await userService.findUser(email)
        res.status(200).json(user) 
        //res.render('partials/main', {layout : 'home', user: user.email });
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
            return res.status(401).send("Token inválido");
          }

        //console.log('isLoggedIn' + (<any>req).user)
        /*if ((<any>req).user) {
            next();
        } else {
            res.status(401).send('Not Logged In');
        }*/
    }
}