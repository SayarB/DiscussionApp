import React, { useState, useEffect, useContext } from "react";
import Thumbnail from "./Thumbnail";
import "./Home.css";
import firebase from "firebase";
import { AuthContext } from "./Auth";
import { app } from "./firebase";
import { Link } from "react-router-dom";
import Login from "./Login";

function Home() {
  const { user } = useContext(AuthContext);

  const signOut = () => {
    if (user) app.auth().signOut();
  };
  return (
    <div className="home">
      <div className="friends">
        <h1>friends</h1>
      </div>
      <div className="thumbnails">
        <Thumbnail
          id="123"
          topic="Vaccine"
          owner="Sayar"
          details="hi we are talking about vaccine of corona virus"
        />
        <Thumbnail
          id="123"
          topic="Vaccine"
          owner="Sayar"
          details="hi we are talking about vaccine of corona virus"
        />
        <Thumbnail
          id="121"
          topic="Women Empowerment"
          owner="Sayar"
          details="hi we are talking about women empowerment"
        />
      </div>
      <div className="user">
        {user && (
          <div>
            <img src={user?.photoURL} />
            <h3>{user?.displayName}</h3>
            <h3 className="email">{user?.email}</h3>
            <Link to="/account">
              <button>Account</button>
            </Link>

            <button onClick={signOut}>Sign Out</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
