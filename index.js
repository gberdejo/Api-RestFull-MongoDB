require('dotenv').config()
const Server = require('./server');

const app = new Server();

app.listen();