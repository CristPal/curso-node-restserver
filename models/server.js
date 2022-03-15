const express = require('express');
const cors = require('cors');

class Server{
     
    constructor(){

        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';


        // Middlewares (Son funciones que añaden funcionalidades al webserver)
        // Son funciones que siempre se van a ejecutar cuando levantemos el server
        this.middlewares(); 

        // Rutas de mi aplicacion
        this.routes();
    }

    middlewares(){

        // cors:
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio publico:
        this.app.use(express.static('public'));
        
    }

    routes(){

        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen(){

        this.app.listen(this.port, () =>{
            console.log('Server corriendo en puerto' , this.port);
        });
    }


}

module.exports = Server;