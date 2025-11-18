const http = require('http');
const express = require('express');

const PORT = 3000;
const app = express();

const server = http.createServer(app);

app.get('/',(req,res)=>{
    res.json({status: "your server is working sir"})
});

server.listen(PORT,()=>{
    console.log(`listening on port ${PORT}...`);
});

