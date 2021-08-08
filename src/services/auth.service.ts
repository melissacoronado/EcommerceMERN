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
    invalidateToken(email: string): string;
    verifyToken(jwt: any): any;
    isValidPassword(passw: string, user: userDTO): void;
    logOutUser(tokenHeader: string): void;
}

export class AuthService implements IAuth{
    constructor(){}

    verifyToken(token: string): any {
        try {
            //const decoded = jwt.verify(token, process.env.TOKEN_KEY);
            //return decoded;

            jwt.verify(token, process.env.TOKEN_KEY, (err: any, user: any) => {
                if (err){
                    throw err;
                }
                return user;
            });

        } catch (err) {
            throw err;
            //return res.status(401).send("Invalid Token");
        }
    }

    generateToken(email: string): string {
        const token = jwt.sign({ 
                        user_id: email },
                        process.env.TOKEN_KEY, {
                            expiresIn: process.env.TOKEN_EXPIRES,
                        });
                        console.log(token);
        return token;
    }

    invalidateToken(email: string): string {
        const token = jwt.sign({ 
                        user_id: email },
                        process.env.TOKEN_KEY, {
                            expiresIn: 1,
                        });
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

    encryptPassw = async (passw: string) => {
        return await bcrypt.hash(passw, 10);
    }

    isValidPassword = async (passw: string, user: userDTO) => {
        return await bcrypt.compare(passw, user.password);
    }

    logOutUser(email: string): string {        
        return this.invalidateToken(email);
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