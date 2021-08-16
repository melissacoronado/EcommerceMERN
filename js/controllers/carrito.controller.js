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
exports.CarritoController = void 0;
const carrito_service_1 = require("../services/carrito.service");
const productos_service_1 = require("../services/productos.service");
const user_service_1 = require("../services/user.service");
const logger_1 = require("../helper/logger");
let CartService = new carrito_service_1.CarritoService();
let ProductoService = new productos_service_1.ProductosService();
let UsersService = new user_service_1.UserService();
class CarritoController {
    showAllCarrito(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const carrito = yield CartService.showAllCarrito();
                if (carrito.length == 0) {
                    res.status(404).json({ error: 'No hay carritos de compras para ningún usuario.' });
                    return;
                }
                else {
                    res.status(200).json(carrito);
                }
            }
            catch (error) {
                logger_1.loggerError.error(error);
                res.status(500).json({ Respuesta: "Error de sistema!" });
            }
        });
    }
    findCarritoByUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idUsuario = req.params.id; //Viene de la url/1 y el + para parsear a numero  
                //Chequear si usuario existe
                const usuarioCarrito = yield UsersService.findUserById(idUsuario);
                if (!usuarioCarrito) {
                    res.status(400).send("Usuario no existe, verifique.");
                }
                //Chequear si usuario posee carrito
                const carrito = yield CartService.findCarritoByUser(idUsuario);
                if (!carrito) {
                    res.status(404).send('Usuario no posee carrito.');
                }
                else {
                    res.status(200).json(carrito);
                }
            }
            catch (error) {
                logger_1.loggerError.error(error);
                res.status(500).json({ Respuesta: "Error de sistema!" });
            }
        });
    }
    addproductoCarrito(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idProducto, cantidad, idUsuario, direccionEntrega } = req.body;
                if (!(idProducto && cantidad && idUsuario && direccionEntrega)) {
                    res.status(400).send("Datos requeridos: idProducto, cantidad, idUsuario, direccionEntrega.");
                }
                //Chequear si usuario existe
                const usuarioCarrito = yield UsersService.findUserById(idUsuario);
                if (!usuarioCarrito) {
                    res.status(400).send("Usuario no existe, verifique.");
                }
                //Chequear si producto existe
                const productoAgregar = yield ProductoService.showProductById(idProducto);
                if (!productoAgregar) {
                    res.status(400).send("Producto a agregar no existe, verifique.");
                }
                if (cantidad < 0 || cantidad > 10000) {
                    res.status(400).send("Cantidad no permitida, verifique.");
                }
                if (productoAgregar.stock < cantidad) {
                    res.status(400).send(`No contamos con stock suficiente. Disponibles ${productoAgregar.stock}, verifique.`);
                }
                let carritoCreado = yield CartService.addProductCarrito(productoAgregar, cantidad, idUsuario, direccionEntrega);
                res.status(200).json({ Respuesta: "Carrito creado/actualizado con éxito.", Carrito: carritoCreado });
            }
            catch (error) {
                logger_1.loggerError.error(error);
                res.status(500).json({ Respuesta: "Error de sistema!" });
            }
        });
    }
    deleteAllCarritoByUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idUsuario = req.params.id;
                //Chequear si usuario existe
                const usuarioCarrito = yield UsersService.findUserById(idUsuario);
                if (!usuarioCarrito) {
                    res.status(400).send("Usuario no existe, verifique.");
                }
                //Chequear si usuario posee carrito
                const carrito = yield CartService.findCarritoByUser(idUsuario);
                if (!carrito) {
                    res.status(404).send('Usuario no posee carrito.');
                }
                yield CartService.deleteCarrito(idUsuario);
                res.status(200).send('Carrito Eliminado.');
            }
            catch (error) {
                logger_1.loggerError.error(error);
                res.status(500).json({ Respuesta: "Error de sistema!" });
            }
        });
    }
    deleteProductCarrito(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idProducto, idUsuario } = req.body;
                if (!(idProducto && idUsuario)) {
                    res.status(400).send("Datos requeridos: idProducto, idUsuario.");
                }
                const carrito = yield CartService.findCarritoByUser(idUsuario);
                if (!carrito) {
                    res.status(404).send('Usuario no posee carrito.');
                }
                //Chequear si producto existe
                const productoEliminar = yield ProductoService.showProductById(idProducto);
                if (!productoEliminar) {
                    res.status(400).send("Producto a eliminar no existe, verifique.");
                }
                const indexproductoCarrito = CartService.existeProductoCarrito(idProducto, carrito);
                if (indexproductoCarrito != -1) {
                    //Borrar item del carrito
                    yield CartService.deleteProductoCarrito(carrito, indexproductoCarrito, productoEliminar);
                    res.status(200).send('Producto eliminado de Carrito.');
                }
                else {
                    res.status(400).send("Producto no existe en el Carrito.");
                }
            }
            catch (error) {
                logger_1.loggerError.error(error);
                res.status(500).json({ Respuesta: "Error de sistema!" });
            }
        });
    }
}
exports.CarritoController = CarritoController;
