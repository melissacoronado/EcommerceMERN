
import express, {Application, Request, Response} from 'express'
import cookieParser from 'cookie-parser';
const MongoStore = require('connect-mongo');
import { RoutesProductos } from "./routes/productos.route";
import { RoutesAuth } from './routes/auth.routes';
import { RoutesCarrito } from './routes/carrito.route';
const db = require('./services/mongoDB')
const expressSession = require("express-session");
export const passport = require("passport");
//export const log4js = require('log4js')


class App {

    public app: express.Application = express();
    public routePrd: RoutesProductos = new RoutesProductos();
    public routeAuth: RoutesAuth = new RoutesAuth();
    public routeCarrito: RoutesCarrito = new RoutesCarrito();

    constructor() {
        this.config();
        //this.logs(); 
        this.routePrd.routes(this.app);   
        this.routeAuth.routes(this.app); 
        this.routeCarrito.routes(this.app); 
    }

    private config(): void{
        this.app.use('/api', express.static(__dirname+ '..'+ '/public')); //Al principio
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: true}))

        this.app.use(cookieParser());

        const session = {
            secret: process.env.SESSION_SECRET,
            cookie: {},
            resave: false,
            saveUninitialized: false
          };          

          this.app.use(expressSession({            
            secret: 's3cr3t',
            resave: false,
            saveUninitialized: false,
            rolling: true,
            cookie: {
                maxAge: 600000
            }
          }));

          this.app.use(passport.initialize());
          this.app.use(passport.session());
          
    }   
  
    
}

export default new App().app;