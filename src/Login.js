import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  Children,
} from "react";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import { app, db } from "./firebase";
import "./Login.css";
import { AuthContext, AuthProvider } from "./Auth";

function Login({ hasOrigin }) {
  const history = useHistory();

  const provider = new firebase.auth.GoogleAuthProvider();

  const { user } = useContext(AuthContext);

  const googleSignIn = () => {
    if (user) signOut();
    else {
      firebase
        .auth()
        .signInWithPopup(provider)

        .then((result) => {
          console.log(result.user);
          db.collection("users")
            .doc(result.user.uid)
            .set({
              name: result.user.displayName,
              email: result.user.email,
              uid: result.user.uid,
              photo: result.user.photoURL,
            })
            .catch((err) => {
              alert(err);
            });
        })

        .catch((err) => alert(err.message));
    }
    if (!hasOrigin) history.push("/");
  };

  const signOut = () => {
    app.auth().signOut();
  };
  return (
    <div className="login_container">
      <div className="login">
        <h1 className="heading">Login</h1>

        {user && <p>{user.email}</p>}
        <button className="googleSignIn" onClick={googleSignIn}>
          Sign In With
          <img
            className="googleLogo"
            src="http://pngimg.com/uploads/google/google_PNG19635.png"
            alt=""
          />
        </button>
      </div>
    </div>
  );
}

export default Login;
