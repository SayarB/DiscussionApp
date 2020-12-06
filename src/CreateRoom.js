import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { app, db } from "./firebase";
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
    <div>
      <h1>Create Room</h1>
      <h1>Name</h1>
      <input
        type="text"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      />
      <h1>Topic</h1>
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      <h1>Description</h1>
      <input
        type="text"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <button onClick={createRoom}>Create</button>
    </div>
  );
}

export default CreateRoom;
