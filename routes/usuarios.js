const {Router} = require('express');
const { check } = require('express-validator');
const { usuariosGet, 
        usuariosPut, 
        usuariosPost, 
        usuariosDelete, 
        usuariosPatch } = require('../controllers/usuarios');

const { validando,
        esAdminRole, 
        tieneRol,
        validandoToken} = require('../middlewares')

const { validarRol, validarCorreo, validarUsuarioPorId } = require('../helpers/db-validators'); //Middleware validador de roles

// creamos la instancia de Router
const router =  Router();

// router de la solicitud get
router.get('/', usuariosGet);

// router de la solicitud put a la direccion /algo/algo
router.put('/:id/',[
        check('id', 'no es un ID valido').isMongoId(),
        check('id').custom(validarUsuarioPorId),
        validando
] ,usuariosPut);

// router de la solicitud post
// Lo que mandamos en el medio, se entiende que es un middleware
router.post('/',[
        check('nombre', 'Se debe ingresar un nombre').notEmpty(), //Reconoce si esta vacio o no
        check('password', 'La contraseña debe tener una longitud de 5 caracteres').isLength({min: 5}),
        check('correo', 'Esto no es un correo valido').isEmail(), //Reonoce si es un correo o no
        check('correo').custom(validarCorreo), 
        // check('rol', 'Esto no es un rol valido').isIn(['ADMIN_ROL', 'USER_ROL']),
        check('rol').custom( validarRol),
        validando //esto tambien es un middleware
                  // Lo colocamos de ultimo porque quiero revisar los posibles errores obtenidos del check
] ,usuariosPost)

// router de la solicitud delete
router.delete('/:id',[
        validandoToken,
        // esAdminRole,
        tieneRol('ADMIN_ROLE', 'USER_ROLE'), // Enviamos los roles como argumentos al middleware
        check('id', 'no es un ID valido').isMongoId(),
        check('id').custom(validarUsuarioPorId),
        validando
],usuariosDelete)

// router de la solicitud patch
router.patch('/', usuariosPatch)

module.exports = router;