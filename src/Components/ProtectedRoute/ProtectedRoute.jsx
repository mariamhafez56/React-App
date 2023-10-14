import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  let { userLoggedIn } = useContext(AuthContext);

  if (userLoggedIn) {
    console.log("looog");
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
}
