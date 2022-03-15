const {Router} = require('Express');
const { route } = require('express/lib/application');
const { usuariosGet, 
        usuariosPut, 
        usuariosPost, 
        usuariosDelete, 
        usuariosPatch } = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id/:test', usuariosPut);

router.post('/', usuariosPost)

router.delete('/', usuariosDelete)

router.patch('/', usuariosPatch)

module.exports = router;