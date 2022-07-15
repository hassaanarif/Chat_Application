let users = [];

let addUser = ({ id, name, room }) => {
	name = name.trim().toLowerCase();
	room = room.trim().toLowerCase();

	let existingUser = users.find((user) => user.room === room && user.name === name);
	if (existingUser) {
		return { error: "User is already present in the room" };
	}

	let user = { id, name, room };
	users.push(user);

	return { user };
};

let removeUser = (id) => {
	let user = users.find((user) => user.id === id);
	if (!user) {
		return { error: "User not found" };
	}

	users = users.filter((user) => user.id !== id);
	return { user };
};

let getUser = (id) => {
	let user = users.find((user) => user.id === id);
	return user;
};

let getUserInRoom = (room) => {
	let user = users.filter((user) => user.room === room);
	return user;
};

module.exports = {
	addUser,
	removeUser,
	getUser,
	getUserInRoom,
};
