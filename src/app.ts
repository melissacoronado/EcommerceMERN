
import express, {Application, Request, Response} from 'express'
//const session = require('express-session');
import cookieParser from 'cookie-parser';
const MongoStore = require('connect-mongo');
const handlebars = require('express-handlebars');
import * as bodyParser from "body-parser";
import { RoutesProductos } from "./routes/productos.route";
//import * as mongoose from "mongoose";
//import * as fs from "fs"
import path, { join } from 'path'
//import { userModel } from './models/schemas/users.schema';
import { RoutesAuth } from './routes/auth.routes';
import { RoutesGeneric } from './routes/generic.routes';
const db = require('./services/mongoDB')

const expressSession = require("express-session");
export const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

import { UserService } from './services/user.service'
import { userDTO } from './models/dto/user.dto';
import { userModel } from './models/schemas/users.schema';

//export const log4js = require('log4js')


class App {

    public app: express.Application = express();
    public routePrv: RoutesProductos = new RoutesProductos();
    public routeAuth: RoutesAuth = new RoutesAuth();
    public routeGeneric: RoutesGeneric = new RoutesGeneric();

    constructor() {
        this.config();
        //this.logs(); 
        //this.mongoSetup();
        this.routePrv.routes(this.app);   
        this.routeAuth.routes(this.app); 
        this.routeGeneric.routes(this.app); 
        this.hbsConfig();  

        /*console.log(__dirname)
        console.log(join(__dirname, '..', '/public/views/partials/'))
        console.log(path.resolve(__dirname, '/public/views/partials/'))
        console.log(path.resolve(__dirname, '..', '/public/views/partials/'))*/
    }

    private config(): void{
        this.app.use('/api', express.static(__dirname+ '..'+ '/public')); //Al principio
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: true}))

        this.app.set('views', join(__dirname, '..','/public/views/')); 
        this.app.set('view engine', 'hbs');

        this.app.use(cookieParser());
        //this.app.use(bodyParser.json());

        const session = {
            secret: process.env.SESSION_SECRET,
            cookie: {},
            resave: false,
            saveUninitialized: false
          };
          

          this.app.use(expressSession({
            store: MongoStore.create({
              mongoUrl: 'mongodb+srv://mcoronado:Europe03**@cluster0.ra8rh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
              ttl: 600
          }),
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

    private hbsConfig(): void{
        //Sets handlebars configurations 
        this.app.engine('hbs', handlebars({
            extname:".hbs",
            defaultLayout:"index.hbs",
            partialsDir: join(__dirname, '..', '/public/views/partials/'),
            layoutsDir: path.join(__dirname, '..','/public/views/layouts/'),
        }));
    }
  
    
}

export default new App().app;