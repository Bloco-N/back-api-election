const game = require('../game')

module.exports = (io, socket) => {

  const init = () => {

    game.init()

  }

  socket.on('game:init', init);

}