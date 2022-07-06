import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";

let socket;

function Chat() {
  let [name, setName] = useState("");
  let [room, setRoom] = useState("");

  let location = useLocation();
  let data = queryString.parse(location.search);
  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    socket = io(ENDPOINT);

    setName(data.name);
    setRoom(data.room);

    socket.emit("join", { name, room });
  });
  return <h1>Chat</h1>;
}

export default Chat;
