import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCfg6JgTPGzJoTr0MQoC5YdvBZfYRmvlUg",
  authDomain: "discussion-app-d3cbc.firebaseapp.com",
  projectId: "discussion-app-d3cbc",
  storageBucket: "discussion-app-d3cbc.appspot.com",
  messagingSenderId: "631853099807",
  appId: "1:631853099807:web:3a0c742ddf4236bc281e2a",
  measurementId: "G-NQEY2XNH2P",
};

export const app = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
