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
exports.RoutesProductos = void 0;
const products_controller_1 = require("../controllers/products.controller");
const auth_controller_1 = require("../controllers/auth.controller");
class RoutesProductos {
    constructor() {
        this.productController = new products_controller_1.ProductController();
        this.authController = new auth_controller_1.AuthController();
    }
    routes(app) {
        app.route('/productos')
            .get(this.authController.isLoggedIn, (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.productController.showProducts(req, res);
            }
            catch (error) {
                res.status(404).json({ error: 'No se pudo obtener el listado de Productos.' });
            }
        }))
            .post(this.productController.addNewProduct);
    }
}
exports.RoutesProductos = RoutesProductos;
/*
import express, {Application, Request, Response} from 'express'
import { ProductosService } from '../services/productos.service'


let opsProd = new ProductosService()

var router = express.Router()


router.get('/', async (req: Request, res: Response) => {
    try{
        const products =  await opsProd.showProducts()
        if (products.length == 0){
            res.status(404).json({error : 'No hay productos cargados.'})
            return;
        }else{
            res.status(200).send(products)
            return;
        }
    }catch(error){
        res.status(404).json({error : 'No se pudo obtener el listado de Productos.'})
    }
})


router.get('/:id', async (req: Request, res: Response) => {
    try{
        const id: number = +req.params.id //Viene de la url/1 y el + para parsear a numero
        opsProd.productos =  await opsProd.showProducts()
        const product =  opsProd.productos.find(x => x.id === id)

        if (opsProd.productos.length == 0){
            res.status(404).json({error : 'No hay productos cargados'})
            return;
        }

        if (product === null){
            res.status(404).json({error : 'Producto no encontrado'})
            return;
        }

        res.status(200).send(product)
    }catch(error){
        res.status(404).json({error : 'No se pudo obtener el Producto solicitado.'})
    }
})

router.post('/productos', async (req: Request, res: Response) => {
    try{
        console.log('post productos');
        const { timestamp, nombre, descripcion, codigo, foto, precio, stock } = req.body
        
        //Falta validar que vengan todos los parametros
        const newProduct = { timestamp, nombre, descripcion, codigo, foto, precio, stock }

        await opsProd.addProduct(newProduct)
        //res.render('partials/addProducts', {layout : 'index'});
        res.render('partials/main', {layout : 'index', ListaProductos: opsProd.productos});
    }catch(error){
        res.status(404).json({error : 'No se pudo agregar el Producto.'})
        console.log(error)
    }
})

router.patch('/actualizar/:id', async (req: Request, res: Response) => {
    try{
        const id: any = req.params.id //Viene de la url/1 y el + para parsear a numero
        opsProd.productos =  await opsProd.showProducts()

        if (opsProd.productos.length == 0){
            res.status(404).json({error : 'No hay productos cargados'})
            return;
        }

        const productSelecc =  opsProd.productos.find(x => x.id === id)
        if (productSelecc === null){
            res.status(404).json({error : 'Producto no encontrado'})
            return;
        }

        const { nombre, descripcion, codigo, foto, precio, stock } = req.body
        await opsProd.updateProducts(id, nombre, descripcion, codigo, foto, precio, stock)
        
        res.status(200).json({Respuesta: "Producto Modificado!"})
    }catch(error){
        res.status(404).json({error : 'No se pudo modificar el Producto.'})
        console.error(error)
    }
})

router.delete('/borrar/:id', async (req: Request, res: Response) => {
    try{
        const id: any = req.params.id
        opsProd.productos =  await opsProd.showProducts()

        if (opsProd.productos.length == 0){
            res.status(404).json({error : 'No hay productos cargados'})
            return;
        }

        const product =  opsProd.productos.find(x => x.id === id)
        if (product === null){
            res.status(404).json({error : 'Producto no encontrado'})
            return;
        }
        
        await opsProd.deleteProduct(id)
        res.status(200).send('Producto Eliminado.')
    }catch(error){
        res.status(404).json({error : 'No se pudo eliminar el Producto.'})
    }
})





export const RouterApiProductos: express.Router = router;*/ 
