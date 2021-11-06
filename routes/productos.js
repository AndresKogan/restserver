const { Router } = require('express');
const { check } = require('express-validator');
const {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto } = require('../controllers/productos');
const { existeCategoria, existeProducto } = require('../helpers/db-validators');
const { esAdminRole } = require('../middlewares');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = new Router();

router.get('/', obtenerProductos)
router.get('/:id', [
    check('id', "no es un id de Mongo válido").isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
], obtenerProducto)
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'La categoría es obligatoria').not().isEmpty(),
    check('categoria', "no es un id de Mongo válido").isMongoId(),
    check('categoria').custom(existeCategoria),
    validarCampos
], crearProducto)
router.put('/:id', [
    validarJWT,
    check('id').custom(existeProducto),
    validarCampos
], actualizarProducto)
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', "no es un id de Mongo válido").isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
], borrarProducto)



module.exports = router;