const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { login } = require('../controllers/login.controller');
const { userValidation } = require('../middlewares/validation');

router.post('/login', [
    check('email', 'el correo no es valido').isEmail(),
    check('password', 'el password debe tener mas de 6 letras').not().isEmpty(),
    userValidation
], login);


module.exports = router;