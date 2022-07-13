const http = require("http");
const express = require("express");
const router = require("./router");
const socketio = require("socket.io");
const { addUser, getUser, getUserInRoom, removeUser } = require("./users");

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
  console.log("New Connection ->", socket.id);

  socket.on("join", ({ name, room }, callback) => {
    let { user, error } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.emit("welcomeMessage", {
      user: "Admin",
      message: `${user.name}, Welcome to the Room ${user.room}`,
    });

    socket.broadcast.to(user.room).emit("welcomeMessage", {
      user: "Admin",
      message: `${user.name} has joined!`,
    });

    socket.join(user.room);

    callback(`User ${user.name} has joined!`);
  });

  socket.on("sendMessage", (message, callback) => {
    let user = getUser(socket.id);
    io.to(user.room).emit("message", { user: user.name, message });
    callback();
  });

  socket.on("disconnect", () => {
    console.log(`Client ${socket.id} Disconnected`);
    let { user } = removeUser(socket.id);

    if (user) {
      socket.broadcast.to(user.room).emit("leaveMessage", {
        user: "Admin",
        message: `${user.name} has left!`,
      });
    }
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server has started at ${PORT}`);
});
