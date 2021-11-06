const { Router } = require('express');
const { check } = require('express-validator');
const {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria } = require('../controllers/categorias');
const { existeCategoria } = require('../helpers/db-validators');
const { esAdminRole } = require('../middlewares');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = new Router();

router.get('/', obtenerCategorias)
router.get('/:id', [
    check('id', "no es un id de Mongo válido").isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
], obtenerCategoria)
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria)
router.put('/:id', [
    validarJWT,
    check('id', "no es un id de Mongo válido").isMongoId(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoria),
    validarCampos
], actualizarCategoria)
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', "no es un id de Mongo válido").isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
], borrarCategoria)



module.exports = router;