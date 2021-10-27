const { response, request } = require('express');

const usuariosGet = (req = request, res = response) => {


    const { q, nombre = "No name", apikey } = req.query;

    res.json({
        msg: 'get api',
        q,
        nombre,
        apikeu
    })
}
const usuariosPut = (req, res) => {

    const { id } = req.params;
    res.json({
        msg: 'put api',
        id
    })
}
const usuariosPost = (req, res) => {

    const { nombre, apellido, edad } = req.body;





    res.json({
        msg: 'post api',
        nombre,
        apellido,
        edad
    })
}
const usuariosDelete = (req, res) => {
    res.json({
        msg: 'delete api'
    })
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}