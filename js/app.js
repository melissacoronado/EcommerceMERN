"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const productos_route_1 = require("./routes/productos.route");
const auth_routes_1 = require("./routes/auth.routes");
const carrito_route_1 = require("./routes/carrito.route");
const ordenPedido_route_1 = require("./routes/ordenPedido.route");
const documentacion_route_1 = require("./routes/documentacion.route");
const configs_1 = require("./config/configs");
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
//import * as db from './services/mongoDB';
const db = require('./services/mongoDB'); //Este lo dejo xq sino no me toma la config db
class App {
    constructor() {
        this.app = express_1.default();
        this.routePrd = new productos_route_1.RoutesProductos();
        this.routeAuth = new auth_routes_1.RoutesAuth();
        this.routeCarrito = new carrito_route_1.RoutesCarrito();
        this.routeOrdenPedido = new ordenPedido_route_1.RoutesOrdenPedido();
        this.routeDocs = new documentacion_route_1.RoutesDocs();
        this.config();
        this.routePrd.routes(this.app);
        this.routeAuth.routes(this.app);
        this.routeCarrito.routes(this.app);
        this.routeOrdenPedido.routes(this.app);
        this.routeDocs.routes(this.app);
    }
    config() {
        this.app.use('/api', express_1.default.static(__dirname + '..' + '/public')); //Al principio
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(cookie_parser_1.default());
        this.app.use(express_session_1.default({
            secret: configs_1.configSystem.SESSION_SECRET_SECRET,
            resave: false,
            saveUninitialized: false,
            rolling: true,
            cookie: {
                maxAge: Number(configs_1.configSystem.SESSION_SECRET_COOKIE_MAXAGE)
            }
        }));
        this.app.use(passport_1.default.initialize());
        this.app.use(passport_1.default.session());
    }
}
exports.default = new App().app;
