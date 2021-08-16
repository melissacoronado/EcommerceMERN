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
exports.OrdenPedidoController = void 0;
const ordenPedido_service_1 = require("../services/ordenPedido.service");
const user_service_1 = require("../services/user.service");
const carrito_service_1 = require("../services/carrito.service");
const logger_1 = require("../helper/logger");
const enviarMail_1 = require("../helper/enviarMail");
let ordenPedidoService = new ordenPedido_service_1.OrdenPedidoService();
let UsersService = new user_service_1.UserService();
let CartService = new carrito_service_1.CarritoService();
class OrdenPedidoController {
    showAllOrdenPedidos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ordenes = yield ordenPedidoService.showPedidos();
                if (ordenes.length == 0) {
                    res.status(404).send('No hay ordenes disponibles.');
                }
                else {
                    res.status(200).json(ordenes);
                }
            }
            catch (error) {
                logger_1.loggerError.error(error);
                res.status(500).json({ Respuesta: "Error de sistema!" });
            }
        });
    }
    findOrdenPedidoByPedido(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idPedido = req.params.id;
                const pedido = yield ordenPedidoService.showPedidosByPedido(idPedido);
                if (!pedido) {
                    res.status(404).send('Pedido no encontrado.');
                }
                else {
                    res.status(200).json(pedido);
                }
            }
            catch (error) {
                logger_1.loggerError.error(error);
                res.status(500).json({ Respuesta: "Error de sistema!" });
            }
        });
    }
    findOrdenPedidoByUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idUsuario = req.params.id;
                //Chequear si usuario existe
                const usuarioCarrito = yield UsersService.findUserById(idUsuario);
                if (!usuarioCarrito) {
                    res.status(400).send("Usuario no existe, verifique.");
                }
                //Chequear si usuario posee Ordenes
                const ordenesUsuario = yield ordenPedidoService.showPedidosByUser(idUsuario);
                if (!ordenesUsuario) {
                    res.status(404).send('Usuario no posee ordenes.');
                }
                else {
                    res.status(200).json(ordenesUsuario);
                }
            }
            catch (error) {
                logger_1.loggerError.error(error);
                res.status(500).json({ Respuesta: "Error de sistema!" });
            }
        });
    }
    addNewOrdenPedido(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idUsuario = req.params.id;
                if (!(idUsuario)) {
                    res.status(400).send("Datos requeridos: idUsuario.");
                }
                //Chequear si usuario existe
                const usuarioCarrito = yield UsersService.findUserById(idUsuario);
                if (!usuarioCarrito) {
                    res.status(400).send("Usuario no existe, verifique.");
                }
                //Chequear si usuario posee carrito
                const carrito = yield CartService.findCarritoByUser(idUsuario);
                if (!carrito) {
                    res.status(404).send('Usuario no posee carrito para generar orden de pedido.');
                }
                else {
                    //Armamos datos para generar orden
                    const estado = "generada";
                    let totalOrden = 0;
                    carrito.productos.forEach(element => {
                        totalOrden = totalOrden + parseFloat(element.total.toString());
                    });
                    const productos = carrito.productos;
                    const newOrden = { idUsuario, productos, estado, totalOrden };
                    yield ordenPedidoService.addPedidosByCarritoUser(newOrden);
                    res.status(200).json(`Orden ${estado} con éxito`);
                }
            }
            catch (error) {
                logger_1.loggerError.error(error);
                res.status(500).json({ Respuesta: "Error de sistema!" });
            }
        });
    }
    completeOrdenPedidoByPedido(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idPedido } = req.body;
            if (!idPedido) {
                res.status(400).send("Datos requeridos: idPedido.");
            }
            //Chequear si orden existe
            const ordenCompletar = yield ordenPedidoService.showPedidosByPedido(idPedido);
            if (!ordenCompletar) {
                res.status(400).send("Orden no existe, verifique.");
            }
            if (ordenCompletar.estado.toLocaleLowerCase() !== "generada") {
                res.status(400).send("Orden no esta en estado generada, no se puede completar.");
            }
            else {
                ordenPedidoService.completePedidosByPedido(idPedido, ordenCompletar);
                //Enviar mail
                const userCliente = yield UsersService.findUserById(ordenCompletar.idUsuario);
                if (userCliente) {
                    enviarMail_1.sendGMail({
                        from: 'Servidor Node.js',
                        to: userCliente.email,
                        subject: `Su orden Nro. ${ordenCompletar.idPedido} ha sido completada!`,
                        html: "<h3>Su orden ha sido completada con éxito!</h3>"
                    });
                }
                else {
                    logger_1.loggerWarn.warn(`No se encontro usuario para enviar mail`);
                }
                res.status(200).json('Orden completada con exito');
            }
        });
    }
}
exports.OrdenPedidoController = OrdenPedidoController;
