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
exports.MensajeService = void 0;
const mensaje_schema_1 = require("../models/schemas/mensaje.schema");
const logger_1 = require("../helper/logger");
class MensajeService {
    constructor() {
        this.getMessages = () => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield mensaje_schema_1.mensajeModel.find().lean().exec();
            }
            catch (error) {
                throw error;
            }
        });
        this.addMessage = (msg) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newMsg = new mensaje_schema_1.mensajeModel(msg);
                yield newMsg.save()
                    .then(() => logger_1.logger.info(`Mensaje Agregado`))
                    .catch((err) => logger_1.loggerError.error(err));
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.MensajeService = MensajeService;
