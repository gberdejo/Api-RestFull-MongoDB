const  { Router }  = require('express');
const { usersGet,
        usersPost,
        usersDelete,
        usersUpdate,
        usersPatch } = require('../controllers/users.controllers');
const router = Router();


router.get('/', usersGet );
router.post('/', usersPost );
router.put('/:id', usersUpdate );
router.delete('/', usersDelete );
router.patch('/', usersPatch );
 
module.exports = router;