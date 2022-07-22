import "./Chat.css";
import { useLocation } from "react-router-dom";
import ChatInfoSideBar from "./ChatInfoSideBar/ChatInfoSideBar";
import ChatInput from "./ChatInput/ChatInput";
import InfoBar from "./InfoBar/InfoBar";
import io from "socket.io-client";
import MessageArea from "./MessageArea/MessageArea";
import queryString from "query-string";
import React, { useEffect, useState } from "react";

let socket;

function Chat() {
	let [name, setName] = useState("");
	let [room, setRoom] = useState("");
	let [message, setMessage] = useState("");
	let [messages, setMessages] = useState([]);
	let [users, setUsers] = useState([]);

	let location = useLocation();

	const ENDPOINT = "localhost:5000";

	useEffect(() => {
		socket = io(ENDPOINT);

		let data = queryString.parse(location.search);

		socket.emit("join", { name: data.name, room: data.room }, (returnMessage) => {
			if (returnMessage.error) {
				console.log(returnMessage.error);
			}

			setUsers(returnMessage);
		});

		socket.on("welcomeMessage", (message) => setMessages([...messages, message]));

		setName(data.name);
		setRoom(data.room);

		return () => {
			socket.disconnect();
			socket.off();
		};
	}, [ENDPOINT, name, room]);

	useEffect(() => {
		socket.on("message", (message) => {
			setMessages([...messages, message]);
		});
	}, [messages]);

	useEffect(() => {
		socket.on("roomData", (users) => {
			setUsers(users);
		});
	}, [users]);

	let sendMessage = (e) => {
		e.preventDefault();

		if (message) {
			socket.emit("sendMessage", { name, message }, () => {
				setMessage("");
			});
		}
	};

	let closeChat = () => {
		console.log("Chat Closed");
		socket.disconnect();
		socket.off();
	};

	return (
		<section className="ChatComponent">
			<section className="ChatContainer">
				<InfoBar room={room} closeChat={closeChat} />
				<MessageArea messages={messages} name={name} />
				<ChatInput message={message} sendMessage={sendMessage} setMessage={setMessage} />
			</section>

			<section className="ChatInfoSideBarContainer">
				<ChatInfoSideBar users={users} room={room} />
			</section>
		</section>
	);
}

export default Chat;
