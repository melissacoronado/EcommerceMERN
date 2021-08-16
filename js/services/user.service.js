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
exports.UserService = void 0;
const users_schema_1 = require("../models/schemas/users.schema");
const path_1 = require("path");
const fs_1 = __importDefault(require("fs"));
const logger_1 = require("../helper/logger");
class UserService {
    constructor() {
        this.findUserByEmail = (mail) => __awaiter(this, void 0, void 0, function* () {
            const user = yield users_schema_1.userModel.findOne({ email: mail }).exec();
            return user;
        });
        this.findUserById = (id) => __awaiter(this, void 0, void 0, function* () {
            const user = yield users_schema_1.userModel.findOne({ _id: id }).exec();
            return user;
        });
        this.findAll = () => __awaiter(this, void 0, void 0, function* () {
            return yield users_schema_1.userModel.find().exec();
        });
        this.newUser = (user) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = new users_schema_1.userModel(user);
                yield newUser.save()
                    .then(() => logger_1.logger.info(`Usuario Guardado`))
                    .catch((err) => logger_1.loggerError.error(err));
                //copiar foto avatar
                let ext = user.avatar.split('.');
                fs_1.default.copyFile(user.avatar, path_1.join(__dirname, '../..', `/public/avatar/${user.nombre}${user.apellido}.${ext[ext.length - 1]}`), (err) => {
                    if (err) {
                        logger_1.loggerError.error(`Error Found: ${err}`);
                    }
                    else {
                        logger_1.loggerError.error("\nFoto avatar copiado");
                    }
                });
                return newUser;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.UserService = UserService;
