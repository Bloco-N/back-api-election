require('dotenv').config(); // dontenv config
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origins: ["http://localhost:3000", "https://chat-socket-io-front.netlify.app"],
    methods: ["GET", "POST"]
  }
});

const registerChatHandlers = require('./handlers/chatHandlers');
const registerGameHandlers = require('./handlers/gameHandlers');
const registerPlayerHandlers = require('./handlers/playerHandlers');

const onConnection = (socket) => {
  try {

    registerChatHandlers(io, socket);
    registerGameHandlers(io, socket);
    registerPlayerHandlers(io, socket);

    socket.on('disconnect', () => {

      console.log('disconnectado');

    })

  } catch (error) {
    console.log(error.message);
  }

}

io.on('connection', onConnection);

server.listen(process.env.PORT, () => {
  console.log(`running api`)
})