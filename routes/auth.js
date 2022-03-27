const {Router} = require('express');
const { check } = require('express-validator');

const { login, googleSignIn } = require('../controllers/auth');
const { validando } = require('../middlewares/validar');

const router =  Router();

router.post('/login', [
    check("correo", "Debe ingresar el correo").isEmail(),
    check("password", "Debe ingresar la contraseña").not().isEmpty(),
    validando
], login);

router.post('/google', [
    check("id_token", " ID Token de google es necesario").not().isEmpty(),
    validando
], googleSignIn);



module.exports = router;
