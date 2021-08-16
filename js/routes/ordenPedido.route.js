"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutesOrdenPedido = void 0;
const ordenPedido_controller_1 = require("../controllers/ordenPedido.controller");
const auth_controller_1 = require("../controllers/auth.controller");
class RoutesOrdenPedido {
    constructor() {
        this.ordenPedidoController = new ordenPedido_controller_1.OrdenPedidoController();
        this.authController = new auth_controller_1.AuthController();
    }
    routes(app) {
        app.route('/orden')
            .get(this.authController.isLoggedIn, this.ordenPedidoController.showAllOrdenPedidos)
            .post(this.authController.isLoggedIn, this.ordenPedidoController.completeOrdenPedidoByPedido);
        app.route('/orden/:id')
            .get(this.authController.isLoggedIn, this.ordenPedidoController.findOrdenPedidoByPedido)
            .post(this.authController.isLoggedIn, this.ordenPedidoController.addNewOrdenPedido);
        //app.route('/orden/new/')
        //.post(this.authController.isLoggedIn, this.ordenPedidoController.addNewOrdenPedido);
        app.route('/orden/user/:id')
            .get(this.authController.isLoggedIn, this.ordenPedidoController.findOrdenPedidoByUser);
    }
}
exports.RoutesOrdenPedido = RoutesOrdenPedido;
