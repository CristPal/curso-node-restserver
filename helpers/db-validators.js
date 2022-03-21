const Role = require('../models/role');
const Usuario = require('../models/usuario')

// Validando que exista el rol
const validarRol = async  (rol = '')  => {

    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
            throw new Error(`El rol ${rol} ingresado no existe`);
    }

}

// Validando que el correo ya este registrado
const validarCorreo = async(correo = '') =>{

    const existeEmail = await Usuario.findOne({correo})
    if (existeEmail){
        throw new Error(`El correo ${correo} ya esta registrado en el sistema`);
    }
}

// Validando que exista el id
const validarUsuarioPorId = async(id) =>{

    const existeUser = await Usuario.findById(id)
    if (!existeUser){
        throw new Error(`El id ${id} no existe`);
    }
}
    
module.exports = { 
    validarRol,
    validarCorreo,
    validarUsuarioPorId
}

