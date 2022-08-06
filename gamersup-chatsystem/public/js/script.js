

const socket = io("http://localhost:3000");
const name = prompt("What is your name?");

socket.on("connect", () => {
    console.log("connected");
});

// EMITING OR SENDING DATA TO THE SERVER
socket.emit('join', name);

// HANDLING EVENT ON THE CLIENT SIDE
socket.on("joined_user", data => {
    displayMessage(data, `${data} joined the chat`);
})

// HANDLING EVENTS
socket.on("message", (data) => {
    console.log("from the server:- ", data);
})

socket.on("chat", data => {
    displayMessage(data.username, data.message);
})

socket.on("left", data => {
    displayMessage(data.username, data.message);
})

const chatBox = document.getElementById("chatbox");
const input = document.querySelector("input");
const button = document.querySelector("button");

button.addEventListener("click", () => {
    if (input.value == "") {
        alert("Please type something");
    } else {
        const message = input.value;
        input.value = "";
        socket.emit("chat_message", message); 
    }      
})

function displayMessage(user, message) {
    const div = document.createElement("div");
    div.classList.add("message");
    div.innerHTML = `<p class="user">${user}</p>
                <p class="chat_message">${message}</p>`;
    chatBox.appendChild(div);
}