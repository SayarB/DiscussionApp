import React from "react";
import "./Thumbnail.css";
import { Link } from "react-router-dom";
function Thumbnail({ id, topic, owner, details }) {
  return (
    <Link className="roomLink" to={`/Room/${id}`}>
      <div className="thumbnail">
        <div className="head">
          <h2 className="topic">{topic}</h2>
          <p className="createdBy">Created By : {owner}</p>
        </div>
        <h4>Description</h4>
        <p className="message">{details}</p>
      </div>
    </Link>
  );
}

export default Thumbnail;
