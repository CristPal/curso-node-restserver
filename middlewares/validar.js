// Importamos las funciones necesarias para el funcionamiento de nuestro middleware 
const { validationResult } = require('express-validator');

// Nuestro middleware
// middleware = función
const validando = (req, res, next) => {

    const errores = validationResult(req);
    if (!errores.isEmpty()){ // Verificamos si existen errores
        return res.status(400).json(errores); // Enviamos como respuesta los errores ocurridos en la validacion
    }
    
    next(); //Permite continuar el codigo si no se preduce ningun error
}

// Exportamos la funcion 'middleware' para poder usarla  
module.exports = {
    validando
}
