import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Join.css";

function Join() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <>
      <div className="outerContainer">
        <section className="innerContainer">
          <h1 className="innerContainer__Heading">Join</h1>
          <div className="section-input">
            <div>
              {" "}
              <input className="my-2 innerContainer__Input" type="text" placeholder="Username" onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              {" "}
              <input
                className="my-2 innerContainer__Input"
                type="text"
                placeholder="Room i.e Gaming, Tour, Planning"
                onChange={(e) => setRoom(e.target.value)}
              />
            </div>
            <Link onClick={(event) => (!name || !room ? event.preventDefault() : null)} to={`/chat?name=${name}&room=${room}`}>
              <button className="my-2 innerContainer__Button" type="submit" onClick={() => console.log(name, room)}>
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
