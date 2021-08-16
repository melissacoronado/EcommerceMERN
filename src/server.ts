import { configSystem } from './config/configs';
import { logger, loggerError, loggerWarn } from './helper/logger';
import app from './app';
import * as http from 'http';
import { MensajeService } from './services/mensaje.service';
import { mensajeDTO } from './models/dto/mensajes.dto';
var server = http.createServer(app);

export let puerto = configSystem.PORT || 3001;

let msgService: MensajeService = new MensajeService();
//-------SOCKET----
//Trabaje solo el backend pero esto esta probado de la entrega del desafio 13
const io = require('socket.io')(http, { autoConnect: false/*, transports: ['websocket']*/ })

io.on('connection', (socket: any) => {
    let idSock = socket.id
    let addedMail = false;
    console.log('A user connected' + socket.id);

    
    //chat
    socket.on('New chatMsg', (data: any) => {
        //Leer data
        const { email, message, timestamp } = data  

        //Agregar usuario - asociar correo con socket
        if (!addedMail){
            socket.mail = email;
        }        

        //Guardar el mensaje en la BD
        try{
            let newMsg: mensajeDTO = {email, timestamp, message};
            msgService.addMessage(newMsg)
                .then(() => logger.info(`Mensaje Agregado`))
                .catch( (err: any) => loggerError.error(err));
        }catch(error){            
            loggerError.error(error);
        }

        //Emit para mostrar en la lista
        io.emit('new message', {email, timestamp, message});
    });

    
    socket.on('disconnect', () => {
        console.log(`Disconnected ${idSock}`);
    });
});
//------------------

server.listen(puerto, ()=> {    
    //loggerWarn.warn(`Servidor escuchando en puerto ${puerto} PID Worker ${process.pid}`);
    logger.info(`Servidor escuchando en puerto ${puerto} PID Worker ${process.pid}`);
}).on("error", (err: any)=>{
    loggerError.error(err);
    logger.error(err);
})




