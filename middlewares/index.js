// Como se llama index.js, sera el archivo que se buscara para las importaciones

// Asignamos variables que tendran el conjuto de todo lo que querramos exportar de los archivos
// Debe ser reconocible
const validar = require('../middlewares/validar'); //Nuestro middleware de envio de errores
const validarRoles = require('../middlewares/validar-roles'); // Validar admin
const validarToken = require('../middlewares/validar-token'); // Validando token JWT

// Usamos operador spread  para exportar todo 
module.exports = {
    ...validar,
    ...validarRoles,
    ...validarToken
}


