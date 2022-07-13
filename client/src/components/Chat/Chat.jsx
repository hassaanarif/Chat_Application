import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";
import ChatInput from "./ChatInput/ChatInput";
import InfoBar from "./InfoBar/InfoBar";
import MessageArea from "./MessageArea/MessageArea";

import "./Chat.css";

let socket;

function Chat() {
  let [name, setName] = useState("");
  let [room, setRoom] = useState("");
  let [message, setMessage] = useState("");
  let [messages, setMessages] = useState([]);

  let location = useLocation();

  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    socket = io(ENDPOINT);

    let data = queryString.parse(location.search);
    setName(data.name);
    setRoom(data.room);

    socket.emit("join", { name, room }, (returnMessage) => {
      console.log(returnMessage);
    });

    return () => {
      socket.disconnect();
      socket.off();
    };
  }, [ENDPOINT, name, room]);

  useEffect(() => {
    socket.on("welcomeMessage", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  let sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
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
        <MessageArea messages={messages} />
        <ChatInput message={message} sendMessage={sendMessage} />
      </section>
      <section className="ChatInfoContainer">
        <h1>Chat Info will go here</h1>
      </section>
    </section>
  );
}

export default Chat;
