import express, {Application, Request, Response, NextFunction } from 'express'
import { GenericController } from "../controllers/generic.controller";
const { fork } = require('child_process')


export class RoutesGeneric { 

    public genericController: GenericController = new GenericController() 

    public routes(app: Application): void {        
   
        app.get('/info', async (req: Request, res: Response) =>{
            try{        
                await this.genericController.showProcessInfo(req, res);                
            }catch(error){
                res.status(404).json({error : 'No se pudo obtener el listado de Productos.'})
            }
        });

        app.get('/randoms',(req: Request, res: Response) => {
            let arrGenNums;
            const cant: number = +req.params.id || 100000000;

            const computo = fork('./random.js')
            computo.send('start')
            computo.on('Generar', (sum: Number, cant: Number) => {
                console.log('computo.on Generar');
                arrGenNums = sum;
                res.end(`La suma es ${sum}`)
            })
            console.log('Aqui'+arrGenNums);
            res.render('partials/main', {layout : 'login', arrayNum: arrGenNums});
        })


    }
}
