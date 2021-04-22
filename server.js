const express = require('express');
const cors = require('cors');
class Server{

    constructor(){
        this._app = express();
        this._port = process.env.PORT;
        this._apiUsers = '/api/users';
        this.middlewares();
        this.routes();
    }
    middlewares(){
       //CORS 
        this._app.use(cors());

        //PARSE TO JSON
        this._app.use(express.json());

        //STATIC PUBLIC
        this._app.use(express.static('public'));
    }
    routes(){
       this._app.use(this._apiUsers,require('./routes/users.routes'));
    }
    listen(){
        this._app.listen(this._port,()=>{
            console.log("Server on port"+this._port);
        });
    }
}
module.exports = Server;