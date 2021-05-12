"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const users_schema_1 = require("../models/schemas/users.schema");
class UserService {
    constructor() {
        this.findUser = (mail, passw) => __awaiter(this, void 0, void 0, function* () {
            const user = yield users_schema_1.userModel.find({ email: mail }).exec();
            return user;
        });
        this.findAll = () => __awaiter(this, void 0, void 0, function* () {
            return yield users_schema_1.userModel.find().exec();
        });
    }
    newUser(user) {
        return new users_schema_1.userModel(user)
            .save()
            .then((user) => {
            console.log("Usuario Guardado");
            Promise.resolve(user);
        })
            .catch((err) => console.log(err));
    }
}
exports.UserService = UserService;
