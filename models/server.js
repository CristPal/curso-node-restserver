const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server{
     
    constructor(){

        // Creacion del server
        this.app = express(); // Llamado al express
        this.port = process.env.PORT; // Usando puerto como variable en .env
        this.usuariosPath = '/api/usuarios'; // Ruta de usuarios
        this.usuariosAuth = '/api/auth';     // Ruta de autenticacion

        // Conectar DB
        this.conectarDB();

        // Middlewares (Son funciones que añaden funcionalidades al webserver)
        // Son funciones que siempre se van a ejecutar cuando levantemos el server
        this.middlewares(); 

        // Rutas de mi aplicacion
        this.routes();
    }

    async conectarDB(){
        await dbConnection()
    }

    middlewares(){
        // Middlewares
        // cors:
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio publico:
        this.app.use(express.static('public'));
        
    }

    routes(){
        // Nuestras rutas 
        this.app.use(this.usuariosAuth, require('../routes/auth')); 
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen(){
        // Listening del puerto
        this.app.listen(this.port, () =>{
            console.log('Server corriendo en puerto' , this.port);
        });
    }


}

module.exports = Server;