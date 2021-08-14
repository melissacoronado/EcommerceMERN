import { configSystem } from './config/configs';
import { logger, loggerError, loggerWarn } from './helper/logger';
import app from './app';
import * as http from 'http';
var server = http.createServer(app);

export const usuariomail = configSystem.USER_MAIL;
export const passwmail = configSystem.PASS_MAIL;

export let puerto = configSystem.PORT || 3001;

server.listen(puerto, ()=> {
    loggerError.error(`Prueba logger Error ${puerto} PID`);
    //loggerWarn.warn(`Servidor escuchando en puerto ${puerto} PID Worker ${process.pid}`);
    //logger.info(`Servidor escuchando en puerto ${puerto} PID Worker ${process.pid}`);

}).on("error", (err: any)=>{
    console.log(err)
})




