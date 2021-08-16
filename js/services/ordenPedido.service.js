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
exports.OrdenPedidoService = void 0;
const orden_schema_1 = require("../models/schemas/orden.schema");
const logger_1 = require("../helper/logger");
class OrdenPedidoService {
    constructor() {
        this.showPedidos = () => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield orden_schema_1.ordenPedidoModel.find().lean().exec();
            }
            catch (error) {
                throw error;
            }
        });
        this.showPedidosByUser = (idUsuario) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield orden_schema_1.ordenPedidoModel.find({ idUsuario: idUsuario }).exec();
            }
            catch (error) {
                throw error;
            }
        });
        this.showPedidosByPedido = (idPedido) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield orden_schema_1.ordenPedidoModel.findOne({ _id: idPedido }).exec();
            }
            catch (error) {
                throw error;
            }
        });
        this.addPedidosByCarritoUser = (ordenPedido) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newProd = new orden_schema_1.ordenPedidoModel(ordenPedido);
                yield newProd.save()
                    .then(() => logger_1.logger.info(`Orden generada`))
                    .catch((err) => logger_1.loggerError.error(err));
            }
            catch (error) {
                throw error;
            }
        });
        this.updatePedidoscomplete = (idPedido, ordenCompletar) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(idPedido + '-- edo: ' + ordenCompletar.estado);
                yield orden_schema_1.ordenPedidoModel.updateOne({ _id: idPedido }, { $set: {
                        estado: ordenCompletar.estado
                    }
                })
                    .then(() => logger_1.logger.info(`Orden Completada`))
                    .catch((err) => logger_1.loggerError.error(err));
            }
            catch (error) {
                throw error;
            }
        });
        this.completePedidosByPedido = (idPedido, ordenCompletar) => __awaiter(this, void 0, void 0, function* () {
            try {
                ordenCompletar.estado = "Completada";
                yield this.updatePedidoscomplete(idPedido, ordenCompletar);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.OrdenPedidoService = OrdenPedidoService;
