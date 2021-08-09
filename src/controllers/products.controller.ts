import { Request, Response } from 'express';
import { productosDTO } from '../models/dto/productos.dto';
import { ProductosService } from '../services/productos.service';

let ProductsService = new ProductosService()

export class ProductController{

    public async addNewProduct (req: Request, res: Response) {                
        const { timestamp, nombre, descripcion, codigo, fotos, precio, stock } = req.body  
        if (!(nombre && codigo && precio && stock)) {
            res.status(400).send("Datos requeridos: nombre, código, precio, stock.");
        }       

        await ProductsService.addProduct(req.body)       
        res.status(200).json('Producto almacenado con exito');
    }

    public async showProducts (req: Request, res: Response) {                
        const products =  await ProductsService.showProducts()       
        if (products.length == 0){
            res.status(404).json({error : 'No hay productos cargados.'})
            return;
        }else{
            res.status(200).json(products);
        }        
    }

    public async showProductsById (req: Request, res: Response) {  
        try{              
            const id: string = req.params.id //Viene de la url/1 y el + para parsear a numero  
            const product: productosDTO =  await ProductsService.showProductById(id);
            if(!product)
            {
                res.status(404).json({error : 'Producto no encontrado.'})
            }  
            res.status(200).json(product);
        }catch(error){  
            console.log(error);          
            res.status(500).json({Respuesta: "Error de sistema!"}) 
        }
    }

    public async updateProduct (req: Request, res: Response) {   
        try{             
            const id: string = req.params.id //Viene de la url/1 y el + para parsear a numero  
            const product: productosDTO =  await ProductsService.showProductById(id);
            if(!product)
            {
                res.status(404).json({error : 'Producto no encontrado.'})
            }

            const { nombre, descripcion, codigo, foto, precio, stock } = req.body
            if (!(nombre && codigo && precio && stock)) {
                res.status(400).send("Datos requeridos: nombre, código, precio, stock.");
            }

            let timestamp = new Date();
            const updateProduct: productosDTO = {timestamp, nombre, descripcion, codigo, foto, precio, stock};
            await ProductsService.updateProduct(id, updateProduct);
            
            res.status(200).json({Respuesta: "Producto Modificado!"}) 
        }catch(error){  
            console.log(error);          
            res.status(500).json({Respuesta: "Error de sistema!"}) 
        }
    }

    public async deleteProduct (req: Request, res: Response) {     
        try{           
            const id: string = req.params.id 
            const product: productosDTO =  await ProductsService.showProductById(id);
            if(!product)
            {
                res.status(404).json({error : 'Producto no encontrado.'})
            }

            await ProductsService.deleteProduct(id)
            res.status(200).send('Producto Eliminado.')  
        }catch(error){  
            console.log(error);          
            res.status(500).json({Respuesta: "Error de sistema!"}) 
        }
    }
}