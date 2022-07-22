import React from "react";
import "./ChatInfoSideBar.css";

function ChatInfoSideBar({ users, room }) {
	return (
		<div className="ChatInfoContainer">
			<div className="ChatInfoContainer__Room">{`Room: ${room}`}</div>
			<div className="ChatInfoContainer__NoOfUsers">{`Users in the Room: ${users.length}`}</div>
			{users.map(({ name }, index) => {
				return (
					<div key={index} className="ChatInfoContainer__Users">
						{name}
					</div>
				);
			})}
		</div>
	);
}

export default ChatInfoSideBar;
