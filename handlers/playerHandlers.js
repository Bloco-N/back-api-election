const game = require('../game')

module.exports = (io, socket) => {

  const add = (data) => {

    game.players.push(data);

  }

  const remove = (data) => {

    const index = game.players.indexOf(data.user_id);
    game.players.splice(index, 1);

  }

  socket.on('player:add', add);
  socket.on('player:remove', remove);

}