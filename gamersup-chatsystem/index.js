const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: '*' } });



const users = {};


io.on("connection", (socket) => { 
    
    socket.on("sendMessage", data => {       
        console.log(data); 
        io.emit("message", data);
    })

    socket.on("join", user => {             
        if (user != null && user.userID > 0) {            
            users[socket.id] = user;
            console.log("User: " + users[socket.id].userName + socket.id);
            socket.broadcast.emit("joined_user", user);
            io.emit('user-list', users);
        }
    })

    socket.on("chat_message", message => {
        socket.broadcast.emit('chat', {
            username: users[socket.id],
            message: message
        })
    })

    socket.on("disconnect", () => {     
        console.log("Socket user: "  + users[socket.id]);
        console.log("Left: " + socket.id);
        if (users[socket.id] != null || users[socket.id] != undefined) {
            io.emit("left",
            {username: users[socket.id].userName,
            message: users[socket.id] + " left the chat room"});
            
        }
        delete users[socket.id];       
      
    })
    
});


server.listen(3000, () => {
    console.log("Server started on port 3000...");
});