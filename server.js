const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Serve static files from the public directory
app.use(express.static('public'));

// When a client connects
io.on('connection', (socket) => {
    console.log('A user connected');

    // Broadcast when a user connects
    socket.broadcast.emit('message', 'A user has joined the chat');

    // Listen for chat messages
    socket.on('chatMessage', (msg) => {
        io.emit('message', msg); // Send the message to everyone
    });

    // Runs when client disconnects
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat');
    });
});

// Start server on port 3000
server.listen(3000, () => console.log('Server running on port 3000'));
