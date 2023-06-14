const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

const { joinRoom, leaveRoom,
  getRooms } = require('./rooms')

const waitingRoom = [];
io.on('connection', (socket) => {
  const id = socket.id;
  console.log(`socket id = ${id}`);
  socket.on('joinRoom', () => {
    joinRoom(id, socket);
    socket.emit('roomJoined', getRooms())
  });

  socket.on('disconnect', () => {
    leaveRoom(id)
  })
  console.log(waitingRoom.length);
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
