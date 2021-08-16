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
exports.CarritoService = void 0;
const itemCarrito_dto_1 = require("../models/dto/itemCarrito.dto");
const carrito_schema_1 = require("../models/schemas/carrito.schema");
const productos_service_1 = require("./productos.service");
const logger_1 = require("../helper/logger");
let ProductsService = new productos_service_1.ProductosService();
class CarritoService {
    constructor() {
        //listaProductos:productosDTO[] = [];
        this.showAllCarrito = () => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield carrito_schema_1.carritoModel.find().lean().exec();
            }
            catch (error) {
                throw error;
            }
        });
        this.findCarritoByUser = (idUsuario) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield carrito_schema_1.carritoModel.findOne({ idUsuario: idUsuario }).lean().exec();
            }
            catch (error) {
                throw error;
            }
        });
        this.existeProductoCarrito = (idProducto, carrito) => {
            try {
                let indexProductoCarrito = -1;
                carrito.productos.forEach(element => {
                    if (element.idProducto.toString() === idProducto.toString()) {
                        indexProductoCarrito = carrito.productos.indexOf(element);
                        return indexProductoCarrito;
                    }
                });
                return indexProductoCarrito;
            }
            catch (error) {
                throw error;
            }
        };
        this.addCarrito = (carrito) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newCarrito = new carrito_schema_1.carritoModel(carrito);
                yield newCarrito.save()
                    .then(() => logger_1.logger.info("Carrito agregado a Usuario"))
                    .catch((err) => logger_1.loggerError.error(err));
            }
            catch (error) {
                throw error;
            }
        });
        this.addProductCarrito = (productoAgregar, cantidad, idusuario, direccionEntrega) => __awaiter(this, void 0, void 0, function* () {
            try { //PROBAR TODOOOO
                let arrItemsCarrito = [];
                let cartUser = yield this.findCarritoByUser(idusuario);
                if (cartUser) //Si el usuario ya tiene carrito
                 {
                    logger_1.logger.info(`Usuario tiene carrito`);
                    //Verifico si producto agregar ya existe en el carrito
                    const index = yield this.existeProductoCarrito(productoAgregar._id, cartUser);
                    if (index >= 0) { //Si ya existe
                        //Obtengo los datos del c/producto existentes en el carrito por si cambio stock
                        let prodExistenteAgregarCarrito = yield ProductsService.showProductById(cartUser.productos[index].idProducto);
                        //Si actualmente no tiene stock lo saco del carrito
                        if (prodExistenteAgregarCarrito.stock == 0) {
                            cartUser.productos = cartUser.productos.splice(index, 1);
                            logger_1.loggerWarn.warn(`prodExistenteAgregarCarrito.stock == 0 ${cartUser.productos}`);
                        }
                        //Actualizo los datos del producto ya existente
                        cartUser.productos[index].cantidad = parseInt(cartUser.productos[index].cantidad.toString()) + parseInt(cantidad.toString());
                        cartUser.productos[index].total = parseInt(cartUser.productos[index].cantidad.toString()) * parseInt(prodExistenteAgregarCarrito.precio.toString());
                        cartUser.productos[index].precio = prodExistenteAgregarCarrito.precio;
                        //restar stock
                        prodExistenteAgregarCarrito.stock = prodExistenteAgregarCarrito.stock - cantidad;
                        yield ProductsService.updateProduct(prodExistenteAgregarCarrito._id, prodExistenteAgregarCarrito);
                        //Se actualiza la fecha del cambio
                        cartUser.timestamp = new Date();
                    }
                    else { //Si producto no existe se agrega                    
                        //Obtengo los datos del c/producto existentes en el carrito por si cambio stock
                        let prodExistenteAgregarCarrito = yield ProductsService.showProductById(productoAgregar._id);
                        //Verifico si hay cantidad > 0 en stock para agregar producto
                        if (prodExistenteAgregarCarrito.stock > 0) {
                            if (cantidad > prodExistenteAgregarCarrito.stock) {
                                throw new Error(`No hay suficiente stock producto ${prodExistenteAgregarCarrito.nombre}, disponibles: ${prodExistenteAgregarCarrito.stock}`);
                            }
                            else {
                                cartUser.productos.push({
                                    idProducto: productoAgregar._id,
                                    cantidad: parseInt(cantidad.toString()),
                                    precio: parseInt(prodExistenteAgregarCarrito.precio.toString()),
                                    total: parseInt(prodExistenteAgregarCarrito.precio.toString()) * parseInt(cantidad.toString())
                                });
                                //Se actualiza la fecha del cambio
                                cartUser.timestamp = new Date();
                            }
                        }
                    }
                    yield this.updateCarrito(idusuario, cartUser);
                }
                else {
                    logger_1.logger.info(`Usuario no tiene carrito`);
                    //Si el usuario no tiene carrito
                    const itemCarrito = new itemCarrito_dto_1.itemCarritoDTO(productoAgregar._id, parseInt(cantidad.toString()), parseInt(productoAgregar.precio.toString()), parseInt(productoAgregar.precio.toString()) * parseInt(cantidad.toString()));
                    const itemsCarritoArray = [];
                    itemsCarritoArray.push(itemCarrito);
                    const newCartuser = {
                        idUsuario: idusuario,
                        productos: itemsCarritoArray,
                        direccionEntrega: direccionEntrega,
                        timestamp: new Date()
                    };
                    const newCart = yield this.addCarrito(newCartuser);
                    //restar Stock                
                    productoAgregar.stock = parseInt(productoAgregar.stock.toString()) - parseInt(cantidad.toString());
                    yield ProductsService.updateProduct(productoAgregar._id, productoAgregar);
                    return newCart;
                }
            }
            catch (error) {
                throw error;
            }
        });
        this.deleteCarrito = (idusuario) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield carrito_schema_1.carritoModel.deleteOne({ idUsuario: idusuario });
                logger_1.logger.info(`Carrito eliminado`);
            }
            catch (error) {
                throw error;
            }
        });
        this.updateCarrito = (idUsuario, carrito) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield carrito_schema_1.carritoModel.updateOne({ idUsuario: idUsuario }, { $set: {
                        productos: carrito.productos,
                        timestamp: new Date()
                    }
                })
                    .then(() => logger_1.logger.info(`Carrito actualizado`))
                    .catch((err) => logger_1.loggerError.error(err));
            }
            catch (error) {
                throw error;
            }
        });
        this.deleteProductoCarrito = (carrito, indexproductoCarrito, productoEliminar) => __awaiter(this, void 0, void 0, function* () {
            try {
                carrito.productos.splice(indexproductoCarrito, 1);
                let cantRetorna = carrito.productos[indexproductoCarrito].cantidad;
                yield this.updateCarrito(carrito.idUsuario, carrito);
                //Regresar stock
                productoEliminar.stock = parseInt(productoEliminar.stock.toString()) + parseInt(cantRetorna.toString());
                yield ProductsService.updateProduct(productoEliminar._id, productoEliminar);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.CarritoService = CarritoService;
