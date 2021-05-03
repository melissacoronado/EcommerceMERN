import { userDTO } from "../models/dto/user.dto"
import { userModel } from '../models/schemas/users.schema'
import { Model } from "mongoose";

interface IUser{  
    //Metodos  
    findUser(email: string, passw: string): void;
    newUser(user: userDTO): void;
}

export class UserService implements  IUser{

  constructor(){}

    findUser = async (email: string, passw: string) => {
        const user = await userModel.find({email: email}).exec();
        return user;
    }

    findAll = async () => {
        return await userModel.find().exec();
    }

    newUser(user: userDTO) {
        return new userModel(user)
                       .save()
                       .then((user: any) => {
                           console.log("Usuario Guardado");
                           Promise.resolve(user)
                       })
                       .catch( (err: any) => console.log(err));    
    }

  /*  
  public async findOne(params): Promise<any> {
    return await User.find<User>(params).first()
    .then(user => {
      return (user) 
      ? Promise.resolve(user) 
      : Promise.reject('User not exist')
    })
    .catch(err => Promise.reject(new NotFoundException(err)))
  }*/
}