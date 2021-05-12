"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passport = void 0;
const express_1 = __importDefault(require("express"));
const session = require('express-session');
const cookie_parser_1 = __importDefault(require("cookie-parser"));
//const MongoStore = require('connect-mongo');
const handlebars = require('express-handlebars');
const productos_route_1 = require("./routes/productos.route");
//import * as fs from "fs"
const path_1 = __importStar(require("path"));
const auth_routes_1 = require("./routes/auth.routes");
const generic_routes_1 = require("./routes/generic.routes");
const db = require('./services/mongoDB');
const expressSession = require("express-session");
exports.passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const user_service_1 = require("./services/user.service");
const user_dto_1 = require("./models/dto/user.dto");
//export const log4js = require('log4js')
class App {
    constructor() {
        this.app = express_1.default();
        this.routePrv = new productos_route_1.RoutesProductos();
        this.routeAuth = new auth_routes_1.RoutesAuth();
        this.routeGeneric = new generic_routes_1.RoutesGeneric();
        this.config();
        //this.logs(); 
        //this.mongoSetup();
        this.routePrv.routes(this.app);
        this.routeAuth.routes(this.app, exports.passport);
        this.routeGeneric.routes(this.app);
        this.hbsConfig();
        /*console.log(__dirname)
        console.log(join(__dirname, '..', '/public/views/partials/'))
        console.log(path.resolve(__dirname, '/public/views/partials/'))
        console.log(path.resolve(__dirname, '..', '/public/views/partials/'))*/
    }
    config() {
        this.app.use('/api', express_1.default.static(__dirname + '..' + '/public')); //Al principio
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.set('views', path_1.join(__dirname, '..', '/public/views/'));
        this.app.set('view engine', 'hbs');
        this.app.use(cookie_parser_1.default());
        const session = {
            secret: process.env.SESSION_SECRET,
            cookie: {},
            resave: false,
            saveUninitialized: false
        };
        //console.log(`process.argv: ${process.argv} `)
        exports.passport.use(new FacebookStrategy({
            clientID: process.argv[3] || "322865212595664",
            clientSecret: process.argv[4] || "e0bbfcd509a9f3a2d5281ed521b8bee1",
            callbackURL: "http://localhost:3000/auth/facebook/callback",
            profileFields: ['id', 'displayName', 'photos', 'emails'],
            scope: ['email']
        }, function (accessToken, refreshToken, profile, done) {
            //console.log(profile.emails[0].value);
            var user = {
                //'email': profile.emails[0].value,
                'name': profile.displayName,
                'id': profile.id,
                //'token': accessToken
            };
            //buscar y guardar en la bd
            let UserSrvc = new user_service_1.UserService();
            let usr;
            (() => __awaiter(this, void 0, void 0, function* () {
                usr = yield UserSrvc.findUser(profile.emails[0].value, '');
                if (!usr) {
                    let newUser = new user_dto_1.userDTO(profile.emails[0].value, profile.id, profile.displayName.split(' ')[0], profile.displayName.split(' ')[1]);
                    usr = yield UserSrvc.newUser(newUser);
                }
                //console.log(usr);
                return done(null, usr);
            }))();
        }));
        exports.passport.serializeUser(function (user, done) {
            done(null, user);
        });
        exports.passport.deserializeUser(function (user, done) {
            done(null, user);
        });
        this.app.use(expressSession({
            secret: 's3cr3t',
            resave: true,
            saveUninitialized: true
        }));
        this.app.use(exports.passport.initialize());
        this.app.use(exports.passport.session());
    }
    hbsConfig() {
        //Sets handlebars configurations 
        this.app.engine('hbs', handlebars({
            extname: ".hbs",
            defaultLayout: "index.hbs",
            partialsDir: path_1.join(__dirname, '..', '/public/views/partials/'),
            layoutsDir: path_1.default.join(__dirname, '..', '/public/views/layouts/'),
        }));
    }
}
exports.default = new App().app;
