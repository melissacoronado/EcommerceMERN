import express, {Application, Request, Response, NextFunction } from 'express'
import { GenericController } from "../controllers/generic.controller";
import { puerto, emailAdministrador } from '../server';
const { fork } = require('child_process')
import { sendGMail } from '../helper/enviarMail';


export class RoutesGeneric { 

    public genericController: GenericController = new GenericController() 

    public routes(app: Application): void {        
   
        app.get('/info', async (req: Request, res: Response) =>{
            try{    
                console.log(`PID Worker ${process.pid}`)  
                console.log(`Servidor express <span style="color:blueviolet;">(PM2)</span> en ${puerto} - <b>PID ${process.pid}</b> - ${new Date().toLocaleString()}`);  
                await this.genericController.showProcessInfo(req, res);                
            }catch(error){
                res.status(404).json({error : 'No se pudo obtener el listado de Productos.'})
            }
        });

        app.get('/randoms',(req: Request, res: Response) => {
            let arrGenNums;
            let cant: number = (req.query.cant) ? +req.query.cant : 15; //100000000;
            //console.log(cant);

            const computo = fork('./random.js')
            computo.send(cant);
            computo.on('message', (sum: Number) => {
                console.log('computo.on Generar');
                arrGenNums = sum;
                //res.end(`Aleatorios ${sum}`)
                console.log('Aqui'+sum);
                res.render('partials/randoms', {layout : 'generic', arrayNum: arrGenNums});
            })
            //arrGenNums = {1: 100, 2: 200, 3: 300};
            //console.log('Aqui'+arrGenNums);
            //res.render('partials/randoms', {layout : 'generic', arrayNum: arrGenNums});
        });

        app.get('/saludar', async (req: Request, res: Response) =>{
            try{    
                const mailOptions2 = {
                    from: 'Ecommerce Nuevo Usuario',
                    to: emailAdministrador,
                    subject: "Nuevo Registro",
                    html: `<p>Usuario: Prueba correo</p></br>
                    <p>Edad: 30</p></br>
                    <p>Dirección: Direccion </p></br> `
                }
                sendGMail(mailOptions2);

                res.status(200).json({error : 'Hola.'})              
            }catch(error){
                res.status(404).json({error : 'No se pudo obtener el listado de Productos.'})
            }
        });


    }
}
