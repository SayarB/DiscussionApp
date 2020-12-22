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
    </div>
  );
}

export default Home;
