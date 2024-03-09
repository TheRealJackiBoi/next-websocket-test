var http = require('http');
var Server = require('socket.io').Server;
var server = http.createServer(function (req, res) { });
var io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});
io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('chat message', function (msg) {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});
server.listen(3001, function () {
    console.log('listening on localhost:3001');
});
