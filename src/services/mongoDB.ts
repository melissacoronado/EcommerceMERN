import mongoose from 'mongoose';
import { configSystem } from '../config/configs';
  // BRING IN YOUR SCHEMAS & MODELS
  require('../models/schemas/productos.schema');
  require('../models/schemas/users.schema');
  require('../models/schemas/auth.schema');


const dbURI: string = configSystem.DB_URI!;
mongoose.connect(dbURI,
    {
        useNewUrlParser: (/true/i).test(configSystem.DB_USE_NEW_URL_PARSER!),
        useUnifiedTopology: (/true/i).test(configSystem.DB_USE_UNIFIED_TOPOLOGY!)
    }, error => {
        if (error) throw new Error(`Error en la conexión a la BD ${error}`)
        console.log(error)
    });

// Eventos
mongoose.connection.on('connected', function () {
    console.log('Conexión con Mongoose abierta con: ' + dbURI);
  }); 

  mongoose.connection.on('error',function (err) { 
    console.log('Conexión con Mongoose error: ' + err);
  }); 

  mongoose.connection.on('disconnected', function () { 
    console.log('Conexión con Mongoose desconectada'); 
  });
  
  process.on('SIGINT', function() {   
    mongoose.connection.close(function () { 
      console.log('Conexión con Mongoose desconectada por culminación de la app'); 
      process.exit(0); 
    }); 
  }); 
  
