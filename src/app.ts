
import express, {RequestHandler} from 'express'
import cookieParser from 'cookie-parser';
import { RoutesProductos } from "./routes/productos.route";
import { RoutesAuth } from './routes/auth.routes';
import { RoutesCarrito } from './routes/carrito.route';
import { configSystem } from './config/configs';
import expressSession from 'express-session';
import passport from 'passport';
//import * as db from './services/mongoDB';
const db = require('./services/mongoDB');//Este lo dejo xq sino no me toma la config db


class App {

    public app: express.Application = express();
    public routePrd: RoutesProductos = new RoutesProductos();
    public routeAuth: RoutesAuth = new RoutesAuth();
    public routeCarrito: RoutesCarrito = new RoutesCarrito();

    constructor() {
        this.config();
        this.routePrd.routes(this.app);   
        this.routeAuth.routes(this.app); 
        this.routeCarrito.routes(this.app); 
    }

    private config(): void{
        this.app.use('/api', express.static(__dirname+ '..'+ '/public')); //Al principio
        this.app.use(express.json() as RequestHandler)
        this.app.use(express.urlencoded({extended: true}) as RequestHandler)

        this.app.use(cookieParser());

        this.app.use(expressSession({            
            secret: configSystem.SESSION_SECRET_SECRET!,
            resave: false,
            saveUninitialized: false,
            rolling: true,
            cookie: {
                maxAge: Number(configSystem.SESSION_SECRET_COOKIE_MAXAGE)
            }
        }));

          this.app.use(passport.initialize());
          this.app.use(passport.session());
          
    }   
  
    
}

export default new App().app;