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
exports.ProductosService = void 0;
const productos_schema_1 = require("../models/schemas/productos.schema");
class ProductosService {
    constructor() {
        this.listaProductos = [];
        this.showProducts = () => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield productos_schema_1.productosModel.find().lean().exec();
            }
            catch (error) {
                throw error;
            }
        });
        this.showProductById = (idProd) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield productos_schema_1.productosModel.findOne({ _id: idProd }).exec();
            }
            catch (error) {
                throw error;
            }
        });
        this.showProductByNombre = (nombreProd) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield productos_schema_1.productosModel.find({ nombre: new RegExp('.*' + nombreProd + '.*', "i") }).exec();
            }
            catch (error) {
                throw error;
            }
        });
        this.showProductByPrice = (min, max) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield productos_schema_1.productosModel.find({ precio: { $gt: min, $lt: max } }).exec();
            }
            catch (error) {
                throw error;
            }
        });
        this.addProduct = (producto) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newProd = new productos_schema_1.productosModel(producto);
                yield newProd.save()
                    .then(() => console.log("Producto Guardado"))
                    .catch((err) => console.log(err));
            }
            catch (error) {
                throw error;
            }
        });
        this.updateProduct = (idProd, prodDto) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield productos_schema_1.productosModel.updateOne({ _id: idProd }, { $set: {
                        timestamp: new Date(Date.now()),
                        nombre: prodDto.nombre,
                        descripcion: prodDto.descripcion,
                        codigo: prodDto.codigo,
                        foto: prodDto.foto,
                        precio: prodDto.precio,
                        stock: prodDto.stock
                    }
                })
                    .then(() => console.log("Producto Actualizado"))
                    .catch((err) => console.log(err));
            }
            catch (error) {
                throw error;
            }
        });
        this.deleteProduct = (idProd) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield productos_schema_1.productosModel.deleteOne({ _id: idProd });
                console.log("Producto Eliminado");
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.ProductosService = ProductosService;
