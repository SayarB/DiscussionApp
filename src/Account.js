import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Account.css";
import { AuthContext } from "./Auth";

import { app, db } from "./firebase";
function Account() {
  const history = useHistory();
  const { user } = useContext(AuthContext);
  const signOut = () => {
    if (user) {
      app.auth().signOut();
      history.push("/");
    }
  };
  return (
    <div className="account">
      <div className="user">
        {user && (
          <div className="userAccount">
            <img src={user?.photoURL} />
            <h3>{user?.displayName}</h3>
            <h3 className="email">{user?.email} </h3>
            <Link to="/account"></Link>
          </div>
        )}
        {user && (
          <button onClick={signOut} className="signOutButton">
            Sign Out
          </button>
        )}
        {!user && <h1>No user Found</h1>}
      </div>
    </div>
  );
}

export default Account;
