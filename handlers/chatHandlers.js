const db = require('../db/db');
const { v4: uuidv4 } = require('uuid');

module.exports = (io, socket) => {

  const sendMessage = async (data) => {

    const id = uuidv4();
    const { content, user_id } = data;

    console.log(`[SOCKET] new message:`);
    console.log(data);

    const result = await db('messages').insert({ id, user_id, content});
    if (result.rowCount > 0) {
      io.emit('chat:receive-message', { id, ...data });
    }
  }

  const getMessages = async () => {

    const result = await db('messages');
    if (result) {
      io.emit('chat:get-all-messages', { result });
    }

  }

  socket.on('chat:send-message', sendMessage);
  socket.on('chat:get-all-messages', getMessages);

}