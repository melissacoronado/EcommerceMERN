import { configSystem } from "../config/configs";
import { userDTO } from "../models/dto/user.dto";
import { UserService } from "./user.service";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


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
            jwt.verify(token, configSystem.TOKEN_KEY!, (err: any, user: any) => {
                if (err){
                    throw err;
                }
                return user;
            });

        } catch (err) {
            throw err;
        }
    }

    generateToken(email: string): string {
        const token = jwt.sign({ 
                        user_id: email },
                        configSystem.TOKEN_KEY!, {
                            expiresIn: configSystem.TOKEN_EXPIRES,
                        });
                        //console.log(token);
        return token;
    }

    invalidateToken(email: string): string {
        const token = jwt.sign({ 
                        user_id: email },
                        configSystem.TOKEN_KEY!, {
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
}