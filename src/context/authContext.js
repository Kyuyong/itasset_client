import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios';
export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async ({ username, password }) => {
    const res = await axios.post("/login", {
      username: username,
      password: password,
    });
    setCurrentUser(res.data);
  };

  const logout = async (inputs) => {
    await axios.post("/auth/logout");
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}


