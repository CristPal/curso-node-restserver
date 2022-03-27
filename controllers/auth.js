const bcryptjs = require("bcryptjs");
const { response } = require("express");
const { generarJWT } = require("../helpers/generar-JWT");
const { googleVerify } = require("../helpers/google-verify");
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

const googleSignIn = async(req, res = response) =>{

    const {id_token} = req.body;
    
    try {

        let googleUser = await googleVerify(id_token); 
        const {nombre, correo, img, email_verified} = googleUser
        let usuario = await Usuario.findOne({correo});

        if (!usuario){
            // Tengo que crearlo
            const data = {
                nombre,
                correo,
                password: ':p',
                img,
                google: true,
                rol: "ADMIN_ROLE"
            };

            usuario = new Usuario(data);
            await usuario.save()
        }

        // Si el usuario en DB esta en false
        if (!usuario.estado){
            return res.status(401).json({
                msg: 'Hable con el admin - user bloqueado'
            })
        }

        // Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'El token no se pudo verificar',
        })
    }

}




module.exports ={
    login,
    googleSignIn
}