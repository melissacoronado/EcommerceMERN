import { userDTO } from "../models/dto/user.dto";
import { UserService } from "./user.service";
import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

interface IAuth{  
    //Metodos  
    //findUser(email: string, passw: string): void;
    //newUser(newUser: userDTO): void;
    encryptPassw(passw: string): void;
    checkPassw(passw: string, user: userDTO): void;
}

export class AuthService implements IAuth{
    constructor(){}

    encryptPassw = async (passw: string) => {
        return await bcrypt.hash(passw, saltOrRounds);
    }

    checkPassw = async (passw: string, user: userDTO) => {
        return await bcrypt.compare(passw, user.password)
    }

    /*findUser = async (email: string, passw: string) => {
        try{            
            let user = await UserService.findUser(email, passw); 
            return user;   
        }catch(error){
            throw error
        }
    }

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