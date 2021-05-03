import * as mongoose from 'mongoose';
import { ProductsSchema } from '../models/schemas/productos.schema';
import { Request, Response } from 'express';
import { ProductosService } from '../services/productos.service';

let ProductsService = new ProductosService()

export class ProductController{

    public async addNewProduct (req: Request, res: Response) {                
        const { timestamp, nombre, descripcion, codigo, foto, precio, stock } = req.body  
        //Falta validar que vengan todos los parametros              
        const newProduct = { timestamp, nombre, descripcion, codigo, foto, precio, stock }
        await ProductsService.addProduct(newProduct)       

        res.render('partials/main', {layout : 'home', ListaProductos: ProductsService.listaProductos});
    }

    public async showProducts (req: Request, res: Response) {                
        const products =  await ProductsService.showProducts()       
        if (products.length == 0){
            res.status(404).json({error : 'No hay productos cargados.'})
            return;
        }else{
            res.render('partials/main', {layout : 'home', ListaProductos: products });
        }        
    }

}