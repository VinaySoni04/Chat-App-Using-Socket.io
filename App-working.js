const socket = io('http://localhost:8000');
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInput');
const messageContainer = document.querySelector('.container');

function Messages(msg) {

    let mychat = localStorage.getItem('chat');
    console.log("Chat his", mychat);
    let myhistory = [];
    if (history) { }
    myhistory.push(msg);
    localStorage.setItem('chat', JSON.stringify(myhistory));
}

const append = (message, position, status) => {
    const messageEle = document.createElement('div');
    messageEle.innerText = message;
    messageEle.classList.add('message');
    messageEle.classList.add(position);
    messageEle.classList.add(status);
    messageContainer.append(messageEle);
}

const Name = prompt('Enter your name');
socket.emit('new-user-joined', Name);
let chat = [];

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    let msg = message;
    let type = 1;
    chat.push(msg, type);
    Messages(chat);
    append(`You: ${message}`, 'right',);
    socket.emit('send', message);
    messageInput.value = '';
})

// socket.on listens the event
socket.on('user-joined', Name => {
    append(`${Name} joined the chat`, 'left', 'blue');
})
socket.on('receive', data => {
    append(`${data.Name}: ${data.message}`, 'left');
    let msg = data.message;
    let type = 0;
    chat.push(msg, type);
    Messages(chat);
})
socket.on('left', Name => {
    append(`${Name} left the chat`, 'left', 'red');
})