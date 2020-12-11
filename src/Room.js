import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "./Auth";
import { db, app } from "./firebase";
import SendIcon from "@material-ui/icons/Send";
import firebase from "firebase";
import "./Rooms.css";
import Chat from "./Chat";
function Room() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [topic, setTopic] = useState("");
  const [ownerID, setOwnerID] = useState("");
  const [owner, setOwner] = useState("");
  const [message, setMessage] = useState("");
  const [desc, setDesc] = useState("");
  const dummy = useRef();
  
  useEffect((e) => {
    dummy.current.scrollIntoView({ behaviour: "smooth" });
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

  const sendMessage = async (e) => {
    e.preventDefault();

    if (message !== "") {
      await db
        .collection("rooms")
        .doc(id)
        .collection("messages")
        .doc()
        .set({
          senderID: user?.uid,
          text: message,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => setMessage(""));
      dummy.current.scrollIntoView({ behaviour: "smooth" });
    }
  };

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
        <div className="chatArea">
          <Chat id={id} />
          <div ref={dummy}></div>
        </div>
        <form className="input">
          <input
            type="text"
            className="chatInput"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="sendButton" type="submit" onClick={sendMessage}>
            <SendIcon />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Room;
