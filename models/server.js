const express = require('express');
const cors = require('cors');
const fileUploads = require('express-fileupload');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            productos: '/api/productos',
            uploads: '/api/uploads',
            usuarios: '/api/usuarios',
        }
        this.usuariosPath = '/api/usuarios';

        this.authPath = '/api/auth'

        this.conectarDB();

        this.middlewares();

        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(cors());

        this.app.use(express.json());

        this.app.use(express.static('public'));

        this.app.use(fileUploads({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));

    }


    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'))
        this.app.use(this.paths.buscar, require('../routes/buscar'))
        this.app.use(this.paths.categorias, require('../routes/categorias'))
        this.app.use(this.paths.productos, require('../routes/productos'))
        this.app.use(this.paths.uploads, require('../routes/uploads'))
        this.app.use(this.paths.usuarios, require('../routes/usuarios'))
    }

    listen() {

        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port)

        })
    }
}

module.exports = Server;