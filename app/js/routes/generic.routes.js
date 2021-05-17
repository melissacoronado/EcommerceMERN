"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutesGeneric = void 0;
const generic_controller_1 = require("../controllers/generic.controller");
const { fork } = require('child_process');
class RoutesGeneric {
    constructor() {
        this.genericController = new generic_controller_1.GenericController();
    }
    routes(app) {
        app.get('/info', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(`PID Worker ${process.pid}`);
                yield this.genericController.showProcessInfo(req, res);
            }
            catch (error) {
                res.status(404).json({ error: 'No se pudo obtener el listado de Productos.' });
            }
        }));
        app.get('/randoms', (req, res) => {
            let arrGenNums;
            let cant = (req.query.cant) ? +req.query.cant : 15; //100000000;
            //console.log(cant);
            const computo = fork('./random.js');
            computo.send(cant);
            computo.on('message', (sum) => {
                console.log('computo.on Generar');
                arrGenNums = sum;
                //res.end(`Aleatorios ${sum}`)
                console.log('Aqui' + sum);
                res.render('partials/randoms', { layout: 'generic', arrayNum: arrGenNums });
            });
            //arrGenNums = {1: 100, 2: 200, 3: 300};
            //console.log('Aqui'+arrGenNums);
            //res.render('partials/randoms', {layout : 'generic', arrayNum: arrGenNums});
        });
    }
}
exports.RoutesGeneric = RoutesGeneric;
