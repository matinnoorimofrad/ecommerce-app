const http = require('http');
const app = require('./src/app');
require('dotenv').config();

const PORT = process.env.port;

const server = http.createServer(app);

server.listen(PORT,()=>{
    console.log(`listening on port ${PORT}...`);
});