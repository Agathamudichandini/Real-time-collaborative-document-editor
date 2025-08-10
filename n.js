const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);


app.get('/', (req, res) => {
  res.send('Hello World!');
});


// Serve static files from the public folder
app.use(express.static("public"));

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("chatMessage", (msg) => {
        io.emit("chatMessage", msg); // Broadcast message to all
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

// Start server
server.listen(3002, () => {
    console.log(`Server running at http://localhost:${3002}`);
});
