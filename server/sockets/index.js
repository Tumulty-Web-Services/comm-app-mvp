/*
Documentation

this needs to run on port 3000

These sockets work through proxying to localhost 4000 as

*/

// const app = require('../App');

// const http = require('http')
// // const server = http.createServer(app).listen(4000)

// const socketio = require('socket.io');
// const io = socketio(server);

// /*
// Documentation

// socket.broadcast.emit: send to all users except this one
// io.emit: send to everyone

// */

// io.sockets.on('connection', function(socket){

//     socket.broadcast.emit('new connection')

//     //send a broadcast to refresh a system logs
//     socket.on('refreshSystemLogs', () => {
//         io.emit('refreshSystemLogs');
//     })

//     //send a broadcast to refresh support tickets
//     socket.on('refreshSupportTickets', () => {
//         io.emit('refreshSupportTickets');
//     })

//     socket.on('disconnect', function(){

//        console.log('user disconnected');

//     });
// });
