import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";

let socket;

function Chat() {
  let [name, setName] = useState("");
  let [room, setRoom] = useState("");
  let [message, setMessage] = useState("");
  let [messages, setMessages] = useState([]);

  let location = useLocation();
  let data = queryString.parse(location.search);

  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    socket = io(ENDPOINT);

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

  console.log({ name, room, message, messages });

  return (
    <div className="outerContainer">
      <div className="container">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => (e.key === "Enter" ? sendMessage(message) : null)}
        />
      </div>
    </div>
  );
}

export default Chat;
