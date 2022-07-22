const http = require("http");
const express = require("express");
const router = require("./router");
const socketio = require("socket.io");
const { addUser, getUser, getUserInRoom, removeUser } = require("./users");

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
	cors: {
		origins: ["http://192.168.137.1:3000", "http://localhost:3000", "http://10.10.10.168:3000/"],
		methods: ["GET", "POST"],
	},
});

app.use(router);

io.on("connection", (socket) => {
	console.log("New Connection ->", socket.id);

	socket.on("join", ({ name, room }, callback) => {
		let { user, error } = addUser({ id: socket.id, name, room });

		if (error) return callback({ error });

		socket.emit("welcomeMessage", {
			user: "Admin",
			message: `${name}, Welcome to the ${room}`,
		});

		socket.broadcast.to(user.room).emit("message", {
			user: "Admin",
			message: `${name} has joined!`,
		});

		let totalUsersInRoom = getUserInRoom(user.room);
		io.in(user.room).emit("roomData", totalUsersInRoom);

		socket.join(user.room);

		callback(totalUsersInRoom);
	});

	socket.on("sendMessage", ({ name, message }, callback) => {
		let user = getUser(socket.id);
		io.in(user.room).emit("message", { user: name, message });
		callback();
	});

	socket.on("disconnect", () => {
		console.log(`Client ${socket.id} Disconnected`);
		let { user } = removeUser(socket.id);

		if (user) {
			socket.broadcast.to(user.room).emit("message", {
				user: "Admin",
				message: `${user.name} has left!`,
			});

			let users = getUserInRoom(user.room);
			io.in(user.room).emit("roomData", users);
		}
	});
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
	console.log(`Server has started at ${PORT}`);
});
