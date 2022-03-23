const bcryptjs = require("bcryptjs");
const { response } = require("express");
const { generarJWT } = require("../helpers/generar-JWT");
const Usuario = require('../models/usuario')

const login = async(req, res = response) => {

const {correo, password } = req.body;

try {
    
    // Validar correo
    const usuario = await Usuario.findOne({correo})
    if (!usuario){
        return res.status(400).json({
            msg: "Usuario o password no correctos - correo"
        })
    }
    // Si el usuario esta activo
    if (!usuario.estado){
        return res.status(400).json({
            msg: "Usuario o password no correctos - estado:false"
        })
    }

    // Validar password    
    const validPassword = bcryptjs.compareSync(password, usuario.password); // Metodo para comparar la password con 
    if (!validPassword){                                                    // la guardada en la BD
        return res.status(400).json({
            msg: "Usuario o password no correctos - password"
        })
    }
    // Generar JWT
    const token = await generarJWT(usuario.id);

    res.json({
        usuario,
        token
    })
    
} catch (error) {
    console.log(error);
    return res.status(500).json({
        msg: "Error interno"
    })
}

}

module.exports ={
    login
}