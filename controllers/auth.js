const { response } = require('express');
const bcryptjs = require('bcryptjs')

const { generarJWT } = require('../helpers/generar-jwt')
const Usuario = require('../models/usuario');


const login = async (req, res = response) => {

    const { correo, password } = req.body;
    try {
        const usuario = await Usuario.findOne({ correo })
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }

        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            });
        }

        const validPassword = bcryptjs.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - passwprd'
            });
        };


        const token = await generarJWT(usuario.id);


        res.json({
            usuario,
            token
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador.'
        })
    }


}


module.exports = {
    login
}