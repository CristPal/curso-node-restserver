const {Schema, model} = require('mongoose');


// Así va a lucir nuestro modelo
// Cada uno con su respectivo tipo
const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROL', 'USER_ROL']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})
 
// Para evitar que aparezca la __v y el password en el envio del objeto como respuesta (res)
// debemos modificar el metodo toJSON (maneja lo que se envia) de nuestro Schema (objeto)
// tenemos que usar "function" porque usaremos el this.
UsuarioSchema.methods.toJSON = function() {
    const { __v, password, ...usuario} = this.toObject(); //extraemos el __v y password. Guardamos el resto en usuario
    return usuario; // retornamos el usuario 
}


//  Exportando para crear el modelo 
//  model('El nombre que le va a poner mongoose a la coleccion (s)', esquema) 
module.exports = model( 'Usuario', UsuarioSchema  )




