const { response } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require('../models/usuario');


// Middleware para validar el JWT
const validandoToken = async (req, res = response, next) =>{

    const token = req.header("x-token") // Leo el token del header de la req

    if (!token) {                       // Verifico si el token existe
        return res.status(400).json({   // Termina la aplicacion si el token no existe
            msg: "Token no encontrado"
        })
    }

    try {   // Uso try y catch para obtener el error si no coincide el token con la key
        
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY); // verifica el token con la key
        console.log(uid)
        
        // leer el usuario que corresponde al uid
        const usuario = await Usuario.findById(uid);

        // A ver si existe el usuario
        if (!usuario){
            res.status(400).json({
                msg: "Token no valido - El usuario no existe DB"
            })
        }
        // Verificar si el usuario ya ha sido borrado
        if (!usuario.estado){
            res.status(400).json({
                msg: "Token no valido - El usuario ya estaba eliminado. estado: false"
            })
        }
        req.usuario = usuario;  // Creo la porpiedad uid a la req, para que use ese en los siguientes middleware
        next(); // que siga con las verificaciones

    } catch (error) {   // catcheo el error 
        console.log(error); // muestro el error que me dice la app
        res.status(400).json({
            msg: "token no valido"
        })
    }

}


module.exports = {
    validandoToken,
}