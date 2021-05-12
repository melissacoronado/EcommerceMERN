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
exports.AuthController = void 0;
const user_service_1 = require("../services/user.service");
const user_dto_1 = require("../models/dto/user.dto");
let userService = new user_service_1.UserService();
class AuthController {
    constructor() {
        this.isLoggedIn = (req, res, next) => {
            console.log('isLoggedIn' + req.user);
            if (req.user) {
                next();
            }
            else {
                res.render('partials/main', { layout: 'login', msj: 'Debe iniciar sesión' });
                //res.status(401).send('Not Logged In');
            }
        };
    }
    addNewUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, apellido, email, password } = req.body;
            //Falta validar que vengan todos los parametros              
            const newUser = new user_dto_1.userDTO(nombre, apellido, email, password);
            const userCreated = yield userService.newUser(newUser);
            res.render('partials/main', { layout: 'home', user: newUser.email });
        });
    }
    findUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const user = yield userService.findUser(email, password);
            res.render('partials/main', { layout: 'home', user: user.email });
        });
    }
}
exports.AuthController = AuthController;
