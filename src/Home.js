import React, { useState, useEffect, useContext } from "react";
import Thumbnail from "./Thumbnail";
import "./Home.css";
import firebase from "firebase";
import { AuthContext } from "./Auth";
import { app, db } from "./firebase";
import { Link } from "react-router-dom";
import Login from "./Login";
import Room from "./Room";
import { NotificationImportantTwoTone } from "@material-ui/icons";

function Home() {
  const { user } = useContext(AuthContext);
  const [rooms, setRooms] = useState([]);
  const signOut = () => {
    if (user) app.auth().signOut();
  };
  const getRooms = () => {
    const ref = db.collection("rooms");
    ref.onSnapshot((snapshot) => {
      const items = [];
      snapshot.forEach((doc) => {
        items.push(doc.data());
      });
      console.log(items);
      setRooms(items);
    });
  };

  useEffect(() => {
    getRooms();
  }, []);
  return (
    <div className="home">
      <div className="thumbnails">
        {rooms.map((room) => (
          <Thumbnail id={room.id} />
        ))}
      </div>
      <div className="user">
        {user && (
          <div>
            <img src={user?.photoURL} />
            <h3>{user?.displayName}</h3>
            <h3 className="email">{user?.email} </h3>
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
