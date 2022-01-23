import React from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";

export default function LogoutButton() {
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Link to="/">
      <button onClick={logout}>Logout</button>
    </Link>
  );
}
