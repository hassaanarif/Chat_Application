import React from "react";
import "./ChatInput.css";

function ChatInput({ message, setMessage, sendMessage }) {
  return (
    <div className="ChatInputContainer">
      <input
        className="ChatInput__Input"
        type="text"
        placeholder="Type a Message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => (message && e.key === "Enter" ? sendMessage(e) : null)}
      />
      <button className="ChatInput__Button" disabled={!message} onClick={(e) => sendMessage(e)}>
        &#10148;
      </button>
    </div>
  );
}

export default ChatInput;
