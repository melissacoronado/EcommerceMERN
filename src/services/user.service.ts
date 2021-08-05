import { userDTO } from "../models/dto/user.dto"
import { userModel } from '../models/schemas/users.schema'
import * as bCrypt from 'bcrypt';
import { join } from "path";
const fs = require('fs');

interface IUser{  
    //Metodos  
    findUser(email: string): void;
    newUser(user: userDTO): void;
    isValidPassword(user: userDTO, password: string): void;
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

    newUser = async(user: userDTO) => {
      try{
        const newUser = new userModel(user);
        await newUser.save()
        .then(() => console.log("Usuario Guardado"))
        .catch( (err: any) => console.log(err));
                      
          //copiar foto avatar
          let ext = user.avatar.split('.');
          fs.copyFile(user.avatar, join(__dirname, '../..',`/public/avatar/${user.nombre}${user.apellido}.${ext[ext.length-1]}`), (err: any) => {
            if (err) {
              console.log("Error Found:", err);
            }
            else {          
              console.log("\nFoto avatar copiado");
            }
          });

        return newUser;
      }catch(error){            
        throw error
      }
    }

    isValidPassword = function(user: userDTO, password: string){
      return bCrypt.compareSync(password, user.password);
    }  

    
}