import { createGenerateClassName } from "@material-ui/core";
import React, { useEffect, useState, useContext } from "react";
import { db } from "./firebase";
import "./Message.css";
import { AuthContext } from "./Auth";
function Message({ id, text }) {
  const [senderPhoto, setSenderPhoto] = useState("");
  const [senderName, setSenderName] = useState("");
  const [tag, setTag] = useState("");
  const { user } = useContext(AuthContext);
  useEffect(() => {
    db.collection("users")
      .doc(id)
      .get()
      .then((sender) => {
        setSenderName(sender.data().name);
        setSenderPhoto(sender.data().photo);
      });

    if (id == user?.uid) setTag("sent");
  }, []);
  return (
    <div className={`message ${tag}`}>
      <img className="avatar" src={senderPhoto} />
      <div className={`message_textPortion ${tag}text`}>
        <h4>{senderName}</h4>
        <p className="message_text">{text}</p>
      </div>
    </div>
  );
}

export default Message;
