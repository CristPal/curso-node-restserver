const { response} = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { body } = require('express-validator');


// Peticion Get
const usuariosGet =  async (req, res = response) => {
    
    // Gracias a la desestructuracion podemos darle valores por defecto
    // y mostrarlo segun queramos como respuesta a la request
    
    // // Paginando la cantidad de resultados de la peticion get
    const {limite = 5, desde = 0} = req.query; //del query "/...?..." extraemos el limite 
    const query = {estado: true};
    // Esto es una forma muy eficiente cuando necesito usar funciones asincronas que no 
    // influyen entre ellas, pero que quiero ejecutar simultaniamente para hacerlo 
    // mas eficiente 

    const [total, usuarios] = await Promise.all([ // Promise.'all', crea un arreglo de promesas donde ambas se ejecutan al mismo tiempo
        Usuario.countDocuments(query), // (query, estado: true) contar las que tengan estado true (posible eliminar)
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))

    ])
    res.json({
        total,
        usuarios
    })

}

// Peticion Put
const usuariosPut = async (req, res = response) => {

    const {id, correo} = req.params; // Extraigo los elementos que me interesan cambiar
    const {_id, password, google, ...resto} = req.body; // Traigo del body lo que no me interesa

    // Validar contra la base de datos
    if (password){ //Si viene la password en la peticion put, la debo encriptar igualmente
        const salt = bcryptjs.genSaltSync(10);
        resto.password = bcryptjs.hashSync( password, salt )
    }

    // Actualizar en la base de datos
    const usuario = await Usuario.findByIdAndUpdate([id, correo], resto); // Busca el cambio y lo actualiza en la DB

    //Envio del objeto json como respuesta
    res.json(usuario)

}

// Peticion Post
const usuariosPost = async(req, res = response) => {

    // Valiando errores:
    // Vamos al archivo validation/validar.js y ahi es donde ejecutamos el middleware de
    // las validaciones finales y envios de errores

    // Desestructurando la request
    const {nombre, correo, password, rol} = req.body;
    // Tambien es posible: const body = req.body 

    // Creo instancia del usuario:
    const usuario = new Usuario({nombre, correo, password, rol});

    // Verificar si el correo existe:
    // Una funcion que va a revisar si encuentra un correo igual en nuestro Usuario (clase)
    

    // Encriptar la password
    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync( password, salt )

    // Grabar el registro en BD
    await usuario.save();
    res.json(usuario)
}

// Peticion delete
const usuariosDelete = async(req, res = response) => {
    
    const {id} = req.params;
    
    //Cambio el estado usando ese metodo, filtrando por id y pasandolo a falso
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});

    res.json({ 
        usuario
    })
}

const usuariosPatch = (req, res = response) => {
    res.json({ 
        //Cuando usamos res.json, usulamente mandamos un objeto
        msg: 'patch API - controlador'
    })
}


module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}