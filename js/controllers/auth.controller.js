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
const auth_service_1 = require("../services/auth.service");
const logger_1 = require("../helper/logger");
let userService = new user_service_1.UserService();
let authService = new auth_service_1.AuthService();
class AuthController {
    constructor() {
        this.isLoggedIn = (req, res, next) => {
            const token = req.body.token || req.query.token || req.headers["x-access-token"];
            if (!token) {
                return res.status(403).send("Token (JWT) requerido no encontrado!");
            }
            try {
                const decoded = authService.verifyToken(token);
                req.user = decoded;
                next();
            }
            catch (err) {
                logger_1.loggerError.error(err);
                return res.status(401).send("Token inválido");
            }
        };
    }
    registerUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password, nombre, apellido, direccion, edad, telefono, avatar } = req.body;
                //validar Paramteros obligatorios
                if (!(email && password && nombre && apellido && telefono)) {
                    res.status(400).send("Datos requeridos: email, password, nombre, apellido, telefono.");
                }
                //Chequear si usuario existe
                let userExits = yield userService.findUserByEmail(email);
                if (userExits) {
                    return res.status(409).send("Usuario existe, Por favor inicie sesión.");
                }
                const newUser = { email, password, nombre, apellido, direccion, edad, telefono, avatar };
                let registredUser = yield authService.registerUser(newUser);
                if (registredUser) {
                    let token = authService.generateToken(registredUser.email);
                    return res.header("x-auth-token", token).status(201).json({ Resultado: 'Usuario creado correctamente', jwt: token });
                }
            }
            catch (error) {
                logger_1.loggerError.error(error);
                res.status(500).json({ Respuesta: "Error de sistema!" });
            }
        });
    }
    logInUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (!(email && password)) {
                    res.status(400).send("Es obligatorio Email y password");
                }
                const user = yield userService.findUserByEmail(email);
                if (user) {
                    if (yield authService.isValidPassword(password, user)) {
                        const token = authService.generateToken(user.email);
                        res.header("x-auth-token", token).status(201).json({ Resultado: 'Inicio de sesión Exitoso!', jwt: token });
                    }
                    else {
                        res.status(401).send("Credenciales inválidas");
                    }
                }
                else {
                    res.status(401).send("Acceso No Autorizado");
                }
            }
            catch (err) {
                logger_1.loggerError.error(err);
            }
        });
    }
    logOutUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tokenHeader = req.body.token || req.query.token || req.headers["x-access-token"];
                const decodedTkn = authService.verifyToken(tokenHeader);
                //logger.info(`tkn ${decodedTkn} `);
                const msjLogOut = yield authService.logOutUser(decodedTkn.user_id);
                res.status(200).send("Sesión Finalizada");
            }
            catch (err) {
                logger_1.loggerError.error(err);
            }
        });
    }
}
exports.AuthController = AuthController;
