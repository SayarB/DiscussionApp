import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { app, db } from "./firebase";
import "./CreateRoom.css";
import Login from "./Login";
import { AuthContext } from "./Auth";
function CreateRoom() {
  const { user } = useContext(AuthContext);
  const [roomName, setRoomName] = useState("");
  const [topic, setTopic] = useState("");
  const [desc, setDesc] = useState("");
  const [passwordNeeded, setPasswordNeeded] = useState(false);
  const [password, setPassword] = useState("");
  const history = useHistory();
  const createRoom = () => {
    const document = db.collection("rooms").doc();
    document
      .set({
        id: document.id,
        name: roomName,
        Topic: topic,
        Desc: desc,
        creatorID: app.auth().currentUser.uid,
        password: password
      })
      .catch((err) => alert(err));
    history.push("/");
  };

  const checkboxHandler = (e) => {
    setPasswordNeeded(!passwordNeeded);
  };

  if (user) {
    return (
      <div className="createRoom">
        <h1>Create a Room</h1>

        <div>
          <h3>Your Name</h3>
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
        </div>
        <div>
          <h3>Topic</h3>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>
        <div>
          <h3>Description</h3>
          <input
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className="password">
          <input
            type="checkbox"
            onChange={(e) => {
              checkboxHandler(e);
            }}
          />
          <h3>Private Room</h3>
        </div>
        {passwordNeeded ? (
          <div>
            <h3>Enter Password</h3>
            <input
              type="text"
              className="passwordField"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
        ) : (
          ""
        )}
        <button onClick={createRoom} className="createRoomButton">
          Create Room
        </button>
      </div>
    );
  } else {
    return <Login hasOrigin={true} />;
  }
}

export default CreateRoom;
