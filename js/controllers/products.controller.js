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
exports.ProductController = void 0;
const productos_service_1 = require("../services/productos.service");
const logger_1 = require("../helper/logger");
let ProductsService = new productos_service_1.ProductosService();
class ProductController {
    addNewProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { timestamp, nombre, descripcion, categoria, codigo, fotos, precio, stock } = req.body;
                if (!(nombre && codigo && precio && stock && categoria)) {
                    res.status(400).send("Datos requeridos: nombre, categoria, código, precio, stock.");
                }
                yield ProductsService.addProduct(req.body);
                res.status(201).json('Producto almacenado con exito');
            }
            catch (error) {
                logger_1.loggerError.error(error);
                res.status(500).json({ Respuesta: "Error de sistema!" });
            }
        });
    }
    showProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield ProductsService.showProducts();
            if (products.length == 0) {
                res.status(404).json({ error: 'No hay productos cargados.' });
                return;
            }
            else {
                res.status(200).json(products);
            }
        });
    }
    showProductsById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id; //Viene de la url/1 y el + para parsear a numero  
                const product = yield ProductsService.showProductById(id);
                if (!product) {
                    res.status(404).json({ error: 'Producto no encontrado.' });
                }
                res.status(200).json(product);
            }
            catch (error) {
                logger_1.loggerError.error(error);
                res.status(500).json({ Respuesta: "Error de sistema!" });
            }
        });
    }
    updateProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id; //Viene de la url/1 y el + para parsear a numero  
                const product = yield ProductsService.showProductById(id);
                if (!product) {
                    res.status(404).json({ error: 'Producto no encontrado.' });
                }
                const { nombre, descripcion, categoria, codigo, foto, precio, stock } = req.body;
                if (!(nombre && codigo && precio && stock && categoria)) {
                    res.status(400).send("Datos requeridos: nombre, código, precio, stock.");
                }
                let timestamp = new Date();
                const updateProduct = { timestamp, nombre, descripcion, categoria, codigo, foto, precio, stock };
                yield ProductsService.updateProduct(id, updateProduct);
                res.status(200).json({ Respuesta: "Producto Modificado!" });
            }
            catch (error) {
                logger_1.loggerError.error(error);
                res.status(500).json({ Respuesta: "Error de sistema!" });
            }
        });
    }
    deleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const product = yield ProductsService.showProductById(id);
                if (!product) {
                    res.status(404).json({ error: 'Producto no encontrado.' });
                }
                yield ProductsService.deleteProduct(id);
                res.status(200).send('Producto Eliminado.');
            }
            catch (error) {
                logger_1.loggerError.error(error);
                res.status(500).json({ Respuesta: "Error de sistema!" });
            }
        });
    }
}
exports.ProductController = ProductController;
