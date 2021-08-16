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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const configs_1 = require("../config/configs");
const user_service_1 = require("./user.service");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let UsersService = new user_service_1.UserService();
class AuthService {
    constructor() {
        this.registerUser = (user) => __awaiter(this, void 0, void 0, function* () {
            try {
                let newUser = null;
                let encryptedPassword = yield this.encryptPassw(user.password);
                user.password = encryptedPassword;
                return yield UsersService.newUser(user);
            }
            catch (error) {
                throw error;
            }
        });
        this.encryptPassw = (passw) => __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt_1.default.hash(passw, 10);
        });
        this.isValidPassword = (passw, user) => __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt_1.default.compare(passw, user.password);
        });
    }
    verifyToken(token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, configs_1.configSystem.TOKEN_KEY);
            /*jwt.verify(token, configSystem.TOKEN_KEY!, (err: any, user: any) => {
                if (err){
                    throw err;
                }
                return user;
            });*/
            return decoded;
        }
        catch (err) {
            throw err;
        }
    }
    generateToken(email) {
        const token = jsonwebtoken_1.default.sign({
            user_id: email
        }, configs_1.configSystem.TOKEN_KEY, {
            expiresIn: configs_1.configSystem.TOKEN_EXPIRES,
        });
        //console.log(token);
        return token;
    }
    invalidateToken(email) {
        const token = jsonwebtoken_1.default.sign({
            user_id: email
        }, configs_1.configSystem.TOKEN_KEY, {
            expiresIn: 1,
        });
        return token;
    }
    logOutUser(email) {
        return this.invalidateToken(email);
    }
}
exports.AuthService = AuthService;
