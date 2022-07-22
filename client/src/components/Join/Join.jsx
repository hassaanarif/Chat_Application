import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Join.css";

function Join() {
	const [name, setName] = useState("");
	const [room, setRoom] = useState("");

	let navigate = useNavigate();

	return (
		<>
			<div className="outerContainer">
				<section className="innerContainer">
					<h1 className="innerContainer__Heading">Join</h1>
					<div className="section-input">
						<div>
							{" "}
							<input
								className="my-2 innerContainer__Input"
								type="text"
								placeholder="Username"
								onChange={(e) => setName(e.target.value)}
								onKeyPress={(e) => (name && room && e.key === "Enter" ? navigate(`/chat?name=${name}&room=${room}`) : null)}
							/>
						</div>
						<div>
							{" "}
							<input
								className="my-2 innerContainer__Input"
								type="text"
								placeholder="Room i.e Gaming, Tour, Planning"
								onChange={(e) => setRoom(e.target.value)}
								onKeyPress={(e) => (name && room && e.key === "Enter" ? navigate(`/chat?name=${name}&room=${room}`) : null)}
							/>
						</div>
						<Link onClick={(event) => (!name || !room ? event.preventDefault() : null)} to={`/chat?name=${name}&room=${room}`}>
							<button className="my-2 innerContainer__Button" type="submit">
								Join
							</button>
						</Link>
					</div>
				</section>
			</div>
		</>
	);
}

export default Join;
