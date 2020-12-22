import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { db } from "./firebase";
import "./EnterPassword.css";
function EnterPassword() {
  const { id } = useParams();
  const [password, setPassword] = useState("");
  const [value, setValue] = useState("");
  const history = useHistory();
  useEffect(() => {
    db.collection("rooms")
      .doc(id)
      .get()
      .then((res) => setPassword(res.data().password))
      .catch((err) => alert(err));
  }, []);

  const handlePassword = (e) => {
    e.preventDefault();
    if (value === password) {
      history.push(`/Room/${id}`);
    } else {
      alert("Wrong Password");
    }
  };

  return (
    <div className="enter_password">
      <form className="get_password">
        <h2>Enter Password</h2>
        <input
          type="password"
          className="password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={(e) => handlePassword(e)}>Submit</button>
      </form>
    </div>
  );
}
export default EnterPassword;
