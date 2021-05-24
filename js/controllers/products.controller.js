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
let ProductsService = new productos_service_1.ProductosService();
class ProductController {
    addNewProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { timestamp, nombre, descripcion, codigo, foto, precio, stock } = req.body;
            //Falta validar que vengan todos los parametros              
            const newProduct = { timestamp, nombre, descripcion, codigo, foto, precio, stock };
            yield ProductsService.addProduct(newProduct);
            res.render('partials/main', { layout: 'home', ListaProductos: ProductsService.listaProductos });
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
                res.render('partials/main', { layout: 'home', ListaProductos: products });
            }
        });
    }
}
exports.ProductController = ProductController;
