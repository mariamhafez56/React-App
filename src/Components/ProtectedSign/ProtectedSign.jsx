import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedSign({ children }) {
  let { userLoggedIn } = useContext(AuthContext);

  if (!userLoggedIn) {
    return children;
  } else {
    return <Navigate to={"/home"} />;
  }
}
