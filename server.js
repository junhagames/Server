//  server.js
const Server = require('patchwire').Server;
const ClientManager = require('patchwire').ClientManager;

const gameLobby = new ClientManager();
gameLobby.on('clientAdded', function() {
    gameLobby.broadcast('chat', {
        message: 'A new player has joined the game.'
    });
});

const server = new Server(function(client) {
  gameLobby.addClient(client);
});

server.listen(3001, function() {
    console.log("Server is running...");
});