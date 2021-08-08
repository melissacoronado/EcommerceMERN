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
    showCarrito(): void;
    findCarritoByUser(idUsuario: string): void;
    existeProductoCarrito(idProducto: string, carrito: carritoDTO): void;
    addProductCarrito(productoAgregar: productosDTO, cantidad: number, idusuario: string): void;
    addCarrito(carrito: carritoDTO): void;
    deleteCarrito(idusuario: string):void
    deleteProductoCarrito(carrito: carritoDTO, indexproductoCarrito: number):void
    
}

export class CarritoService implements  ICarrito{
    //listaProductos:productosDTO[] = [];

    showCarrito = async () => {
        try{
            return await carritoModel.find().lean().exec();            
        }catch(error){
            throw error
        }
    }

    findCarritoByUser = async (idUsuario: string) => {
        try{
           return await carritoModel.findOne({idUsuario: idUsuario}).exec();
        }catch(error){
            throw error
        }
    }

    existeProductoCarrito = async (idProducto: string, carrito: carritoDTO) => {
        try{
            let indexProductoCarrito: number= 0;
            carrito.productos.forEach(async element => {
                if(element.idProducto == idProducto){
                    const itemCarrito: itemCarritoDTO = new itemCarritoDTO(idProducto,element.cantidad,element.precio,element.total);
                    //return itemCarrito;
                    return indexProductoCarrito = carrito.productos.indexOf(itemCarrito);
                }
            })
            return -1;
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
                //se verifican si los productos existentes tienen stock
                cartUser.productos.forEach(async element => {
                    //Verifico si producto agregar ya existe en el carrito
                    var index = cartUser.productos.indexOf(element);//REVISAR BIEN

                    //Obtengo los datos del productos existentes en el carrito
                    let prodAgregarCarrito:productosDTO = await ProductsService.showProductById(element.idProducto);
                    //Si actualmente no tiene stock lo saco del carrito
                    if(prodAgregarCarrito.stock == 0){                        
                        cartUser.productos = cartUser.productos.splice(index, 1);
                    }
                    //Si producto ya estaba en el carrito actualizo los datos
                    if(productoAgregar.codigo == prodAgregarCarrito.codigo){
                        cartUser.productos[index].cantidad = cartUser.productos[index].cantidad + cantidad;
                        cartUser.productos[index].total = cartUser.productos[index].cantidad * prodAgregarCarrito.precio;
                        cartUser.productos[index].precio = prodAgregarCarrito.precio;
                        //restar stock
                        prodAgregarCarrito.stock = prodAgregarCarrito.stock - cantidad;
                        await ProductsService.updateProduct(prodAgregarCarrito.codigo, prodAgregarCarrito);
                    }
                    //Verifico si hay cantidad > 0 en stock para agregar producto
                    if(prodAgregarCarrito.stock > 0){
                        cartUser.productos.push({
                            idProducto: productoAgregar.codigo,
                            cantidad: cantidad,
                            precio: prodAgregarCarrito.precio,
                            total: prodAgregarCarrito.precio * cantidad
                        })
                    }
                    //Se aactualiza el carrito
                    return await carritoModel.updateOne({idUsuario: idusuario}, { $set:{
                            productos: cartUser.productos
                        }
                    })
                    .then(() => console.log("Carrito Actualizado correctamente!"))
                    .catch( (err: any) => console.log(err));                    
                });

            }else{
                //Si el usuario no tiene carrito
                const newCartuser = {
                    idUsuario: idusuario,
                    productos: [{
                        idProducto: productoAgregar.codigo,
                        cantidad: cantidad,
                        precio: productoAgregar.precio,
                        total: productoAgregar.precio * cantidad
                    }]
                }
                const newCart = await this.addCarrito(newCartuser);
                //restar Stock
                let prodAgregarCarrito:productosDTO = await ProductsService.showProductById(productoAgregar.codigo);
                prodAgregarCarrito.stock = prodAgregarCarrito.stock - cantidad;
                await ProductsService.updateProduct(productoAgregar.codigo, prodAgregarCarrito);
            }

            /*let totalItemProd: number = cantidad * productoAgregar.precio;            
            const item: itemCarritoDTO = new itemCarritoDTO(productoAgregar.codigo, cantidad, productoAgregar.precio, totalItemProd);
            arrItemsCarrito.push(item);

            const carrito: carritoDTO = new carritoDTO(idusuario, arrItemsCarrito);

            const newProdCarrito = new carritoModel(carrito);
            await newProdCarrito.save()
            .then(() => console.log("Producto agregado al carrito"))
            .catch( (err: any) => console.log(err));*/

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