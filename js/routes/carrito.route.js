"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutesCarrito = void 0;
const auth_controller_1 = require("../controllers/auth.controller");
const carrito_controller_1 = require("../controllers/carrito.controller");
class RoutesCarrito {
    constructor() {
        this.cartController = new carrito_controller_1.CarritoController();
        this.authController = new auth_controller_1.AuthController();
    }
    routes(app) {
        app.route('/carrito')
            .get(this.authController.isLoggedIn, this.cartController.showAllCarrito)
            .post(this.authController.isLoggedIn, this.cartController.addproductoCarrito)
            .delete(this.authController.isLoggedIn, this.cartController.deleteProductCarrito);
        app.route('/carrito/:id')
            .get(this.authController.isLoggedIn, this.cartController.findCarritoByUser)
            .delete(this.authController.isLoggedIn, this.cartController.deleteAllCarritoByUser);
    }
}
exports.RoutesCarrito = RoutesCarrito;
