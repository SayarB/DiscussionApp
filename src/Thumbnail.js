import React, { useContext, useEffect, useState } from "react";
import "./Thumbnail.css";
import { Link } from "react-router-dom";
import { db, app } from "./firebase";
import { AuthContext } from "./Auth";
function Thumbnail({ id }) {
  const [topic, setTopic] = useState("");
  const [details, setDetails] = useState("");
  const [owner, setOwner] = useState("");
  const { user } = useContext(AuthContext);
  useEffect(() => {
    db.collection("rooms")
      .doc(id)
      .get()
      .then((result) => {
        setTopic(result.data().Topic);
        setDetails(result.data().Desc);
        db.collection("users")
          .doc(result.data().creatorID)
          .get()
          .then((res) => setOwner(res.data().name));
      });
  }, []);
  return (
    <Link className="roomLink" to={user ? `/Room/${id}` : "/login"}>
      <div className="thumbnail">
        <div className="head">
          <h2 className="topic">{topic}</h2>
          <p className="createdBy">Created By :<span className="name"> {owner}</span></p>
        </div>
        <h4>Description</h4>
        <p className="message">{details}</p>
      </div>
    </Link>
  );
}

export default Thumbnail;
