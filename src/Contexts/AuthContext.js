import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  let [userLoggedIn, setUserLoggedIn] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      setUserLoggedIn(true);
    } else {
      setUserLoggedIn(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userLoggedIn, setUserLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}
