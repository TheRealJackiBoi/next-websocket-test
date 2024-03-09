const http = require('http');
const { Server } = require('socket.io');


const server = http.createServer((req, res) => {})

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})

io.on('connection', (socket) => {
  console.log('a user connected'); 

  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  }
  );

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
})


server.listen(3001, () => {
  console.log('listening on localhost:3001')
})