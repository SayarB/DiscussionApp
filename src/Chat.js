import React, { useContext, useState, useEffect, useRef } from "react";
import Message from "./Message.js";
import "./Chat.css";
import { db, app } from "./firebase";
import firebase from "firebase";
import { AuthContext } from "./Auth.js";

function Chat({ id }) {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const dummy = useRef();

  const getMessages = () => {
    db.collection("rooms")
      .doc(id)
      .collection("messages")
      .orderBy("createdAt")
      .onSnapshot((snapshot) => {
        const items = [];
        snapshot.forEach((doc) => {
          items.push(doc?.data());
        });
        setMessages(items);
      });
    dummy.current.scrollIntoView();
  };
  useEffect(() => {
    getMessages();
    dummy.current.scrollIntoView();
  }, []);

  return (
    <div className="chat">
      {messages &&
        messages.map((message) => (
          <Message id={message.senderID} text={message.text} />
        ))}
      <div ref={dummy}></div>
    </div>
  );
}

export default Chat;
{
  /*<Message id="1rE0HP055ddAtk4WQB9ZDPlR2cE2" text="Hello" tag="sent" />
      <Message id="4U0MBVGe3PM4aJTQMGPTM7JqmVH3" text="hi" />
      <Message id="1rE0HP055ddAtk4WQB9ZDPlR2cE2" text="Hello" />
      <Message id="4U0MBVGe3PM4aJTQMGPTM7JqmVH3" text="How are u doingsdasdasdasdasdasd" />
      <Message id="1rE0HP055ddAtk4WQB9ZDPlR2cE2" text="Hello" />
      <Message id="1rE0HP055ddAtk4WQB9ZDPlR2cE2" text="Hello" />
*/
}
