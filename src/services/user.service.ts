import { userDTO } from "../models/dto/user.dto"
import { userModel } from '../models/schemas/users.schema'
//import { Model } from "mongoose";
import * as bCrypt from 'bcrypt';

interface IUser{  
    //Metodos  
    findUser(email: string): void;
    newUser(user: userDTO): void;
    isValidPassword(user: userDTO, password: string): void;
    createHash(password: string): void;
}

export class UserService implements  IUser{

  constructor(){}

    findUser = async (mail: string) => {
        const user = await userModel.findOne({email: mail}).exec();
        return user;
    }

    findAll = async () => {
        return await userModel.find().exec();
    }

    newUser(user: userDTO) {
      console.log(`newuser: ${user}`);
        return new userModel(user)
                       .save()
                       .then((user: any) => {
                           console.log("Usuario Guardado");
                           Promise.resolve(user)
                       })
                       .catch( (err: any) => console.log(err));    
    }

    isValidPassword = function(user: userDTO, password: string){
      return bCrypt.compareSync(password, user.password);
    }  

    createHash = function(password: string){
      return bCrypt.hashSync(password, bCrypt.genSaltSync(10));
    }
}