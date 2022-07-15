import React, { useEffect, useRef } from "react";
import "./MessageArea.css";

function MessageArea({ messages, name }) {
  let lastDiv = useRef();

  useEffect(() => {
    lastDiv.current.scrollIntoView({ behavior: "smooth" });
  });

  return (
    <div className="MessageAreaContainer">
      {messages.map(({ user, message }, index) => {
        return (
          <div
            key={index}
            className={`MessageContainer ${
              user === name ? "RightMessageContainer" : user === "Admin" ? "AdminMessageContainer" : "LeftMessageContainer"
            }`}
          >
            {message}
          </div>
        );
      })}
      <div ref={lastDiv} className="ScrollToBottom"></div>
    </div>
  );
}

export default MessageArea;
