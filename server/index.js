const http = require("http");
const express = require("express");
const router = require("./router");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(router);

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("join", (message) => {
    console.log(message);
  });

  socket.on("disconnect", () => {
    console.log("Client Disconnected");
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server has started at ${PORT}`);
});
