require('dotenv').config();
const Server = require('./models/server');
const cors = require('cors')

const server = new Server();

server.listen();
