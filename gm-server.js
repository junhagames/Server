const Server = require('patchwire').Server;
const ClientManager = require('patchwire').ClientManager;

var playerList = new Array();

// 명령어 헨들러
var commandHandlers = {
    isConnected: function(socket, data) {
        socket.set('x', Math.random() * 800);
        socket.set('y', Math.random() * 600);
        socket.send('createPlayer', {
            startX: socket.get('x'),
            startY: socket.get('y')
        });
        console.log(data.message);
    },
    move: function(socket, data) {
        socket.set('x', data.hspd * 4 + socket.get('x'));
        socket.set('y', data.vspd * 4 + socket.get('y'));
        socket.send('movePlayer', {
            x: socket.get('x'),
            y: socket.get('y')
        })
    }
};

// 클라이언트 메니저
const clientManager = new ClientManager();
clientManager.addCommandListener('isConnected', commandHandlers.isConnected);
clientManager.addCommandListener('move', commandHandlers.move);
clientManager.broadcast('createPlayer', commandHandlers.isConnected);

// 서버
var server = new Server(function(client) {
    clientManager.addClient(client);
});

server.listen(3001, function() {
    console.log('Server is running...');
});