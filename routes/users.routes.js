const { Router } = require('express');
const router = Router();
const {
    usersGet,
    usersPost,
    usersDelete,
    usersUpdate,
    usersPatch
} = require('../controllers/users.controllers');

const { check } = require('express-validator');
const { userValidation } = require('../middlewares/validation');
const { isRoleValid, isExistsEmail, isExistsId } = require('../helpers/db-validators');
const { validationJWT } = require('../middlewares/validation-jwt');



router.get('/', usersGet);
router.post('/', [
    check('name', 'El nomnbre es obligatorio').not().isEmpty(),
    check('password', 'el password debe tener mas de 6 letras').isLength({ min: 6 }),
    check('email', 'el correo no es valido').isEmail(),
    check('email').custom(isExistsEmail),
    //check('role','el role no es valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('role').custom(isRoleValid),
    userValidation

], usersPost);
router.put('/:id', [
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(isExistsId),
    check('role').custom(isRoleValid),
    userValidation
], usersUpdate);
router.delete('/:id', [
    validationJWT,
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(isExistsId),
    userValidation
], usersDelete);
router.patch('/', usersPatch);

module.exports = router;