import React from "react";
import { useNavigate } from "react-router-dom";
import "./InfoBar.css";

function InfoBar({ room, closeChat }) {
  let navigate = useNavigate();

  let handleCloseChat = () => {
    closeChat();
    navigate("/", { replace: true });
  };

  return (
    <div className="InfoBarContainer">
      <div className="InfoBar__RoomNumber">{room || "Room"}</div>
      <div className="InfoBar__Close" onClick={handleCloseChat}>
        X
      </div>
    </div>
  );
}

export default InfoBar;
