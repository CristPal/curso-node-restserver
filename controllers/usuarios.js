const { response} = require('express');

// Peticion Get
const usuariosGet = (req, res = response) => {
    
    // const query = req.query;
    // Desestructurando:

    const {sexo = "no hay" , elo, name = "No name", server = "NA"} = req.query;
    // Gracias a la desestructuracion podemos darle valores por defecto
    // y mostrarlo segun queramos como respuesta a la request
    
    res.json({ 
        //Cuando usamos res.json, usulamente mandamos un objeto
        msg: 'get API - controlador',
        sexo,
        elo,
        name,
        server
    })

};

// Peticion Put
const usuariosPut = (req, res = response) => {

    const put = req.params.id;
    const test1 = req.params.test;

    // Tambien es posible desesctruturarlo como 
    // const { id } = req.params.id
    // const { test } = req.params.test

    res.json({ 
        //Cuando usamos res.json, usulamente mandamos un objeto
        msg: 'put API - controlador',
        put,
        test1
    })
}

// Peticion Post
const usuariosPost = (req, res = response) => {

    // Desestructurando la request
    const {nombre, edad} = req.body;
    // Tambien es posible: const body = req. body 

    res.json({ 

        //Cuando usamos res.json, usulamente mandamos un objeto
        msg: 'post API - controlador',
        nombre,
        edad
        // Si ponemos
        // body, nos trae todo el objeto sin filtro
    })
}

// Peticion delete
const usuariosDelete = (req, res = response) => {
    res.json({ 
        //Cuando usamos res.json, usulamente mandamos un objeto
        msg: 'delete API - controlador'
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