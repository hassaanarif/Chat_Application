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
					<div key={index} className={`MessageWrapper ${user === name ? "MessageWrapper--Right" : user === "Admin" ? "MessageWrapper--Center" : "MessageWrapper--Left"}`}>
						<div
							className={`MessageWrapper__Message ${
								user === name ? "MessageWrapper__Message--Right" : user === "Admin" ? "MessageWrapper__Message--Center" : "MessageWrapper__Message--Left"
							}`}
						>
							{message}
						</div>
						<div className="MessageWrapper__Sender">{user}</div>
					</div>
				);
			})}
			<div ref={lastDiv} className="ScrollToBottom"></div>
		</div>
	);
}

export default MessageArea;
