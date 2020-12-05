import React, { useState, useEffect, useContext } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ChatIcon from "@material-ui/icons/Chat";
import SearchIcon from "@material-ui/icons/Search";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import firebase from "firebase";
import { AuthContext } from "./Auth";

function Header() {
  const { user } = useContext(AuthContext);

  return (
    <div classname="header">
      <nav className="header_navbar">
        <img
          src="https://i.pinimg.com/originals/26/49/29/264929a953e1206c03997efcea6d463d.jpg"
          alt=""
          className="header_logo"
        />
        <div className="header_search">
          <div className="searchContainer">
            <input type="text" className="header_searchbar" />
            <Link className="header_searchLink">
              <SearchIcon className="header_searchIcon" />
            </Link>
          </div>
        </div>
        <Link className="header_link" to="/createRoom">
          <AddCircleIcon className="header_link" />
        </Link>
        <Link classname="header_link">
          <ChatIcon className="header_link" />
        </Link>
        <Link to={user? "/account": "/login"} classname="header_link">
          {user ? (
            <img src={user.photoURL} className="header_photo" alt="" />
          ) : (
            <PersonOutlineIcon className="header_link" />
          )}
        </Link>
      </nav>
    </div>
  );
}

export default Header;
