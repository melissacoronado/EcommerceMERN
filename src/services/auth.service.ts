import { userDTO } from "../models/dto/user.dto";
import { UserService } from "./user.service";
//import * as bCrypt from 'bcrypt';
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require('dotenv').config()

let UsersService = new UserService()

interface IAuth{  
    //Metodos  
    registerUser(user: userDTO): void;
    encryptPassw(password: string): void;
    generateToken(email: string): string;
    verifyToken(jwt: any): void;
    isValidPassword(passw: string, user: userDTO): void;
}

export class AuthService implements IAuth{
    constructor(){}

    verifyToken(jwt: any): void {
        try {
            const decoded = jwt.verify(jwt, process.env.TOKEN_KEY);
            return decoded;
        } catch (err) {
            throw err;
            //return res.status(401).send("Invalid Token");
        }
    }

    generateToken(email: string): string {
        const token = jwt.sign(
                          { user_id: email },
                          process.env.TOKEN_KEY,
                          {
                            expiresIn: process.env.TOKEN_EXPIRES,
                          }
                        );
        return token;
    }

    registerUser = async (user: userDTO) => {
        try{   
            let newUser = null;         
            
            let encryptedPassword = await this.encryptPassw(user.password);
            user.password = encryptedPassword;
            return await UsersService.newUser(user);  
        }catch(error){
            throw error
        }
    }

    /*createHash = function(password: string){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10));
    }*/
    encryptPassw = async (passw: string) => {
        // generate salt to hash password
        //const salt = await bcrypt.genSalt(10);
        //return await bcrypt.hash(passw, salt);
        return await bcrypt.hash(passw, 10);
    }

    isValidPassword = async (passw: string, user: userDTO) => {
        //return bCrypt.compare(passw, user.password);
        //return await bcrypt.compare(passw, user.password);
        return await bcrypt.compare(passw, user.password);
    }

/*
    newUser = async (newUser: userDTO) => {
        try{
            newUser.password = await this.encryptPassw(newUser.password);
            let user = await this.findUser(newUser.email, newUser.password);
            if (user && user.length == 0) {   
                const user = await UserService.newUser(newUser); 
            }        
        }catch(error){
            throw error
        }
    }*/


    
}