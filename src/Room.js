import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "./Auth";
import { db, app } from "./firebase";
import SendIcon from "@material-ui/icons/Send";
import "./Rooms.css";
function Room() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [topic, setTopic] = useState("");
  const [ownerID, setOwnerID] = useState("");
  const [owner, setOwner] = useState("");

  const [desc, setDesc] = useState("");

  useEffect(() => {
    console.log(user?.uid);
    db.collection("rooms")
      .doc(id)
      .get()
      .then((res) => {
        setOwnerID(res.data().creatorID);
        setTopic(res.data().Topic);
        setDesc(res.data().Desc);
        db.collection("users")
          .doc(res.data().creatorID)
          .get()
          .then((result) => setOwner(result.data().name));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="room">
      <div className="room_header">
        <div className="backButton">
          <Link to="/">
            <button className="back_button">Back</button>
          </Link>
        </div>
        <div className="room_headerTitle">
          <h1 className="title">{topic}</h1>
          <h2>Description</h2>

          <h3 className="description">{desc}</h3>
          <p className="creator">
            Created By <span>{user?.uid == ownerID ? "You" : owner}</span>
          </p>
        </div>
      </div>
      <div className="room_chat">
        <div className="chatArea">Chat</div>
        <div className="input">
          <input type="text" className="chatInput" />
          <button className="sendButton">
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Room;
