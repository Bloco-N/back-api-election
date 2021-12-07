const db = require('../db/db');
const { v4: uuidv4 } = require('uuid');

module.exports = (io, socket) => {

  const sendMessage = async (data) => {

    const id = uuidv4();
    const { content, user_id } = data;

    console.log(`[SOCKET] new message:`);
    console.log(data);

    const result = await db('messages').insert({ id, user_id, content, type });
    if (result.rowCount > 0) {
      io.emit('chat:receive-message', { id, ...data });
    }
  }

  socket.on('chat:send-message', sendMessage);

}