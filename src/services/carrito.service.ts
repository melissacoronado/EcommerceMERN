import { carritoDTO } from '../models/dto/carrito.dto';
import { itemCarritoDTO } from '../models/dto/itemCarrito.dto';
import { productosDTO } from '../models/dto/productos.dto';
import { carritoModel } from '../models/schemas/carrito.schema'
import { ProductosService } from './productos.service';

let ProductsService = new ProductosService()


interface ICarrito{  
    //Propiedades
    //listaProductos:productosDTO[]
    //Metodos    
    showAllCarrito(): void;
    findCarritoByUser(idUsuario: string): void;
    existeProductoCarrito(idProducto: string, carrito: carritoDTO): void;
    addProductCarrito(productoAgregar: productosDTO, cantidad: number, idusuario: string): void;
    addCarrito(carrito: carritoDTO): void;
    deleteCarrito(idusuario: string):void
    deleteProductoCarrito(carrito: carritoDTO, indexproductoCarrito: number):void
    
}

export class CarritoService implements  ICarrito{
    //listaProductos:productosDTO[] = [];

    showAllCarrito = async () => {
        try{
            return await carritoModel.find().lean().exec();            
        }catch(error){
            throw error
        }
    }

    findCarritoByUser = async (idUsuario: string) => {
        try{
           return await carritoModel.findOne({idUsuario: idUsuario}).lean().exec();
        }catch(error){
            throw error
        }
    }

    existeProductoCarrito = async (idProducto: string, carrito: carritoDTO) => {
        try{
            let indexProductoCarrito: number = -1;

            carrito.productos.forEach(async element => {
                if(element.idProducto.toString() === idProducto.toString()){
                    indexProductoCarrito = carrito.productos.indexOf(element);
                    return indexProductoCarrito;
                }
            })
            return indexProductoCarrito;
        }catch(error){
            throw error
        }
    }

    addCarrito = async (carrito: carritoDTO) => {
        try{            
            const newCarrito= new carritoModel(carrito)
            await newCarrito.save()
            .then(() => console.log("Carrito agregado a Usuario"))
            .catch( (err: any) => console.log(err));

        }catch(error){            
            throw error
        }
    }

    addProductCarrito = async (productoAgregar: productosDTO, cantidad: number, idusuario: string) => {
        try{//PROBAR TODOOOO
            let arrItemsCarrito: itemCarritoDTO[] = [];
            let cartUser:carritoDTO = await this.findCarritoByUser(idusuario);
            if(cartUser)//Si el usuario ya tiene carrito
            {
                console.log(`Usuario tiene carrito`);                
                //Verifico si producto agregar ya existe en el carrito
                const index = await this.existeProductoCarrito(productoAgregar._id!, cartUser);
                if(index >= 0){ //Si ya existe
                    //Obtengo los datos del c/producto existentes en el carrito por si cambio stock
                    let prodExistenteAgregarCarrito:productosDTO = await ProductsService.showProductById(cartUser.productos[index].idProducto);  

                    //Si actualmente no tiene stock lo saco del carrito
                    if(prodExistenteAgregarCarrito.stock == 0){                                                  
                        cartUser.productos = cartUser.productos.splice(index, 1);
                        console.log(cartUser.productos);
                    }
 
                    //Actualizo los datos del producto ya existente
                    cartUser.productos[index].cantidad = parseInt(cartUser.productos[index].cantidad.toString()) + parseInt(cantidad.toString());
                    cartUser.productos[index].total = parseInt(cartUser.productos[index].cantidad.toString()) * parseInt(prodExistenteAgregarCarrito.precio.toString());
                    cartUser.productos[index].precio = prodExistenteAgregarCarrito.precio;
                    //restar stock
                    prodExistenteAgregarCarrito.stock = prodExistenteAgregarCarrito.stock - cantidad;
                    await ProductsService.updateProduct(prodExistenteAgregarCarrito._id!, prodExistenteAgregarCarrito);                        
                }else{ //Si producto no existe se agrega                    
                    //Obtengo los datos del c/producto existentes en el carrito por si cambio stock
                    let prodExistenteAgregarCarrito:productosDTO = await ProductsService.showProductById(productoAgregar._id!);  
                    //Verifico si hay cantidad > 0 en stock para agregar producto
                    if(prodExistenteAgregarCarrito.stock > 0){
                        if(cantidad > prodExistenteAgregarCarrito.stock){
                            throw new Error(`No hay suficiente stock producto ${prodExistenteAgregarCarrito.nombre}, disponibles: ${prodExistenteAgregarCarrito.stock}`);
                        }else{
                            cartUser.productos.push({
                                idProducto: productoAgregar._id!,
                                cantidad: parseInt(cantidad.toString()),
                                precio: parseInt(prodExistenteAgregarCarrito.precio.toString()),
                                total: parseInt(prodExistenteAgregarCarrito.precio.toString()) * parseInt(cantidad.toString())
                            })
                        }
                    }
                }
            }else{
                console.log(`Usuario no tiene carrito`);
                //Si el usuario no tiene carrito
                const itemCarrito: itemCarritoDTO = new itemCarritoDTO(productoAgregar._id!, parseInt(cantidad.toString()), parseInt(productoAgregar.precio.toString()), parseInt(productoAgregar.precio.toString()) * parseInt(cantidad.toString()));
                const itemsCarritoArray: itemCarritoDTO[] = [];
                itemsCarritoArray.push(itemCarrito);
                
                const newCartuser = {
                    idUsuario: idusuario,
                    productos: itemsCarritoArray
                }
                const newCart = await this.addCarrito(newCartuser);
                //restar Stock                
                productoAgregar.stock = parseInt(productoAgregar.stock.toString()) - parseInt(cantidad.toString());
                await ProductsService.updateProduct(productoAgregar._id!, productoAgregar);
                return newCart;
            }
            await this.updateCarrito(idusuario, cartUser);           
            
        }catch(error){            
            throw error
        }
    }

    deleteCarrito = async (idusuario: string) => {
        try{
            await carritoModel.deleteOne({idUsuario: idusuario});
            console.log("Carrito eliminado");
        }catch(error){
            throw error
        }
    }

    updateCarrito = async (idUsuario: string, carrito: carritoDTO) => {
        try{
            await carritoModel.updateOne({idUsuario: idUsuario}, { $set:{
                    productos: carrito.productos
                }
            })
            .then(() => console.log("Carrito Actualizado"))
            .catch( (err: any) => console.log(err));

        }catch(error){
            throw error
        }
    }

    deleteProductoCarrito = async (carrito: carritoDTO, indexproductoCarrito: number) => {
        try{
            carrito.productos = carrito.productos.splice(indexproductoCarrito, 1);
            await this.updateCarrito(carrito.idUsuario, carrito);
        }catch(error){
            throw error
        }
    }
}