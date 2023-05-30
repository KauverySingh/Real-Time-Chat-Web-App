
/// CODE BY KAUVERY SINGH ///

// to establish a webSocket connection between the client-side and server-side
const socket = io('http://localhost:8000');

// Get DOM elements in respective Js variables
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")

// Audio that will play on receiving messages
var audio = new Audio('ting.mp3');

// Function which will append event info to the container
// add sent/received message to container
const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    
    // sound will be played if the message is received
    if(position =='left'){ 
        audio.play();
    }
}


// Ask new user for his/her name and let the server know
// made it a required action
let name = '';
while (!name) {
  name = prompt("Enter your name to join the chat [*Required] : ");
}
document.getElementById('username').innerText = name;
if (name)socket.emit('new-user-joined', name);

// If a new user joins, receive his/her name from the server
socket.on('user-joined', name =>{
    append(`${name} joined the chat`, 'right')
})

// If server sends a message, receive it
socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`, 'left')
})

// If a user leaves the chat, append the info to the container
if (name)socket.on('left', name =>{
    append(`${name} left the chat`, 'right')
})

// If the form gets submitted, send server the message
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = ''
})


/// CODE BY KAUVERY SINGH ///
