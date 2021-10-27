const { Router } = require('express');
const { usuariosDelete,
    usuariosGet,
    usuariosPost,
    usuariosPut } = require('../controllers/usuarios');

const router = new Router();

router.get('/', usuariosGet)
router.put('/:id', usuariosPut)
router.post('/', usuariosPost)
router.delete('/:id', usuariosDelete)


module.exports = router;
