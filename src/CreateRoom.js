import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { app, db } from "./firebase";
import "./CreateRoom.css";
function CreateRoom() {
  const [roomName, setRoomName] = useState("");
  const [topic, setTopic] = useState("");
  const [desc, setDesc] = useState("");
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
      })
      .catch((err) => alert(err));
    history.push("/");
  };
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
      <button onClick={createRoom}>Create</button>
    </div>
  );
}

export default CreateRoom;
