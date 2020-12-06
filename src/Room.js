import React from "react";
import { Link, useParams } from "react-router-dom";

function Room() {
  const { id } = useParams();

  return (
    <div className="room">
      <div className="room_header">
        <div className="backButton">
        <Link to="/">
          <button>Back</button>
        </Link>
        </div>
        <div className="room_headerTitle">
          <h1 className="title"></h1>
        </div>

      </div>
    </div>
  );
}

export default Room;
