const express = require('express');
const cors = require('cors');
//const morgan = require('morgan');
const { dbConnection } = require('../database/config');
class Server {

    constructor() {
        this._app = express();
        this._port = process.env.PORT;
        this._apiUsers = '/api/users';
        this._apiAuth = '/api/auth';
        //1. Coneccion a la base de datos
        this.getConnection();
        //2. Middlewares
        this.middlewares();
        //3. Routes of the app
        this.routes();
    }
    async getConnection() {
        await dbConnection();
    }
    middlewares() {
        //CORS 
        this._app.use(cors());
        //Morgan
        //this._app.use(morgan('dev'));
        //PARSE TO JSON
        this._app.use(express.json());

        //STATIC PUBLIC
        this._app.use(express.static('public'));
    }
    routes() {
        this._app.use(this._apiAuth, require('../routes/auth.routes'));
        this._app.use(this._apiUsers, require('../routes/users.routes'));
    }
    listen() {
        this._app.listen(this._port, () => {
            console.log("Server on port" + this._port);
        });
    }
}
module.exports = Server;