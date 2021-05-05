
import express, {Application, Request, Response} from 'express'
const session = require('express-session');
import cookieParser from 'cookie-parser';
//const MongoStore = require('connect-mongo');
const handlebars = require('express-handlebars');
import * as bodyParser from "body-parser";
import { RoutesProductos } from "./routes/productos.route";
import * as mongoose from "mongoose";
//import * as fs from "fs"
import path, { join } from 'path'
import { userModel } from './models/schemas/users.schema';
import { RoutesAuth } from './routes/auth.routes';
import { RoutesGeneric } from './routes/generic.routes';
const db = require('./services/mongoDB')

const expressSession = require("express-session");
export const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;

import { UserService } from './services/user.service'
import { userDTO } from './models/dto/user.dto';
class App {

    public app: express.Application = express();
    public routePrv: RoutesProductos = new RoutesProductos();
    public routeAuth: RoutesAuth = new RoutesAuth();
    public routeGeneric: RoutesGeneric = new RoutesGeneric();

    constructor() {
        this.config();
        //this.mongoSetup();
        this.routePrv.routes(this.app);   
        this.routeAuth.routes(this.app, passport); 
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

        const session = {
            secret: process.env.SESSION_SECRET,
            cookie: {},
            resave: false,
            saveUninitialized: false
          };

          passport.use(new FacebookStrategy({
              clientID: process.env.facebookID || "322865212595664",
              clientSecret: process.env.facebookSecret || "e0bbfcd509a9f3a2d5281ed521b8bee1",
              callbackURL: "http://localhost:3000/auth/facebook/callback",
              profileFields: ['id', 'displayName', 'photos', 'emails'],   
              scope: ['email']
          },
          function (accessToken: any, refreshToken: any, profile: any, done: any){
            //console.log(profile.emails[0].value);
            var user = {
                //'email': profile.emails[0].value,
                'name' : profile.displayName,
                'id'   : profile.id,
                //'token': accessToken
            }
            //buscar y guardar en la bd
            let UserSrvc = new UserService();
            let usr;
            (async () => {
              usr = await UserSrvc.findUser(profile.emails[0].value, '')
              if(!usr){
                let newUser = new userDTO(profile.emails[0].value, profile.id, profile.displayName.split(' ')[0], profile.displayName.split(' ')[1]);
                usr = await UserSrvc.newUser(newUser);
              }
              //console.log(usr);
              return done(null, usr);
            })()
            
          }
          ));


          passport.serializeUser(function(user: any, done: any) {
            done(null, user);
          });
          
          passport.deserializeUser(function(user: any, done: any) {
            done(null, user);
          });

          this.app.use(expressSession({
            secret: 's3cr3t',
            resave: true,
            saveUninitialized: true
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