const express = require("express");
require('dotenv').config()

const { createServer } = require('http')
const { Server } = require('socket.io')

const registerUserHandler = require('./socketHandlers/user-handler')
const registerOperatorHandler = require('./socketHandlers/operator-handler')
const authMiddleware = require('./middleware/auth-middleware')

const port = normalizePort(process.env.PORT || '5000');
const app = express();
const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: process.env.CLIENT_URL,
        credentials: true
    }
})

const onConnection = (socket) =>
{
    registerUserHandler(io, socket)
    console.log("connected")
}

const onPrivateConnection = (socket) =>{
    console.log("private connected")
    registerOperatorHandler(io, socket)
}

io.of("/private/").use(authMiddleware)
io.on("connection", onConnection)
io.of("/private/").on("connection", onPrivateConnection)

httpServer.listen(port, onListening)

function onListening() {
    console.log('Listening on ' + port);
}


function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}
