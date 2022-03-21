//Modelo para trabajar con la validacion de los roles
//nombre del archivo = nombre de la coleccion en singular
//Trabajamos la nueva coleccion que creamos en mongoDB
const {Schema, model} = require('mongoose');

const RoleSchema = Schema({
    rol: {
        type: String,
        required: [true, "El rol es obligatorio"]
    }
});

module.exports = model('Role', RoleSchema);



