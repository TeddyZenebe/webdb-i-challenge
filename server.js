const express = require('express');

const router = require('./accountRouter')
const server = express();

server.use(express.json());
server.use('/api/accounts',router)

server.get('/',(req, res)=>{
    res.send('hello here is account API')
})

module.exports = server;