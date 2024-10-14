const socket = io();

// Get DOM elements
const chatBox = document.getElementById('chat-box');
const msgInput = document.getElementById('msg');
const sendBtn = document.getElementById('send-btn');

// Receive message from server
socket.on('message', message => {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = message;
    chatBox.appendChild(div);

    // Scroll down to the latest message
    chatBox.scrollTop = chatBox.scrollHeight;
});

// Send message to server
sendBtn.addEventListener('click', () => {
    const msg = msgInput.value;

    // Emit message to server
    socket.emit('chatMessage', msg);

    // Clear input
    msgInput.value = '';
});
