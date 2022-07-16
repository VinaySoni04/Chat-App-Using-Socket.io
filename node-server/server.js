const express = require('express');
const app = express();
const http = require('http');
const server =  http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

//const io = require('socket.io')(5000,{
//    cors: {
//        origin: '*',
//      }
//});

const users = {};
io.on('connection', socket =>{
    socket.on('new-user-joined', Name =>{
        console.log(Name);
        users[socket.id] = Name;
        socket.broadcast.emit('user-joined',Name);
    });

    socket.on('send', message =>{
        socket.broadcast.emit('receive',{message: message, Name: users[socket.id]})
    });

    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
})

server.listen(2000, () => {
	console.log('Listening on *:2000');
});
