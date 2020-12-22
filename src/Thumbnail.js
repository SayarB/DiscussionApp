import React, { useContext, useEffect, useState } from "react";
import "./Thumbnail.css";
import { Link, useHistory } from "react-router-dom";
import { db, app } from "./firebase";
import { AuthContext } from "./Auth";
function Thumbnail({ id }) {
  const [topic, setTopic] = useState("");
  const [details, setDetails] = useState("");
  const [owner, setOwner] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordNeeded, setPasswordNeeded] = useState(false);
  const { user } = useContext(AuthContext);
  const history = useHistory();
  useEffect(() => {
    db.collection("rooms")
      .doc(id)
      .get()
      .then((result) => {
        setTopic(result.data().Topic);
        setDetails(result.data().Desc);
        setPassword(result.data().password);
        db.collection("users")
          .doc(result.data().creatorID)
          .get()

          .then((res) => {
            setOwner(res.data().name);
            if (res.data().uid !== user?.uid && password !== "") {
              setPasswordNeeded(true);
            }
            return res;
          })
          .then((res) => {
            setOwnerId(res.data().uid);
          });
      });
  });

  const handleDelete = async () => {
    db.collection("rooms")
      .doc(id)
      .collection("messages")
      .doc()
      .delete()
      .then(() => db.collection("rooms").doc(id).delete())
      .catch((err) => alert(err));
  };
  const handleSub = () => {
    if (!user) {
      history.push("/login");
    }
  };
  return (
    <div className="roomDiv">
      <Link
        className="roomLink"
        to={passwordNeeded ? `/EnterPassword/${id}` : `/Room/${id}`}
      >
        <div className="thumbnail">
          <div className="head">
            <h2 className="topic">{topic}</h2>
            <p className="createdBy">
              Created By :<span className="name"> {owner}</span>
            </p>
          </div>
          <h4>Description</h4>
          <p className="message">{details}</p>
        </div>
      </Link>
      <div className="thumbnail_buttons">
        {ownerId === user?.uid ? (
          <button className="delete_room" onClick={() => handleDelete()}>
            Delete
          </button>
        ) : (
          ""
        )}

        <button className="subscribe_button" onClick={() => handleSub()}>
          Subscribe
        </button>
      </div>
    </div>
  );
}

export default Thumbnail;
