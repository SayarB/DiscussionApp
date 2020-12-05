import React from "react";
import { Link, useParams } from "react-router-dom";

function Room() {
  const { id } = useParams();

  return (
    <div>
      <h1>Room: {id} </h1>
      <Link to="/">
        <button>Back</button>
      </Link>
    </div>
  );
}

export default Room;
