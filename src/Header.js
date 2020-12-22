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
        <div className="header_logo">
          <h1 className="header_title">Coffee House</h1>
        </div>

        {/*<div className="header_search">
          <div className="searchContainer">
            <input type="text" className="header_searchbar" />
            <Link className="header_searchLink">
              <SearchIcon className="header_searchIcon" />
            </Link>
          </div>
  </div>*/}
        <Link className="header_link" to="/createRoom">
          <div className="header_link">
            <AddCircleIcon className="addCircle" />
            <p className="create_room">Create Room</p>
          </div>
        </Link>

        <Link to={user ? "/account" : "/login"} classname="header_link">
          <div className="header_link">
            {user ? (
              <img src={user.photoURL} className="header_photo" alt="" />
            ) : (
              <PersonOutlineIcon className="header_link" />
            )}
          </div>
        </Link>
      </nav>
    </div>
  );
}

export default Header;
