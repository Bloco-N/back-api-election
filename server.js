require('dotenv').config(); // dontenv config
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

const registerChatHandlers = require('./handlers/chatHandlers');

const onConnection = (socket) => {
  try {

    registerChatHandlers(io, socket);
    registerUserHandlers(io, socket);

  } catch (error) {
    console.log(error.message);
  }

}

io.on('connection', onConnection);

server.listen(process.env.PORT, () => {
  console.log(`running api`)
})