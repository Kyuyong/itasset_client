import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios';
export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );


  const login = async ({ username, password }) => {
    try {
      const response = await axios.post("/login", { username, password });
      const { data } = response;
      if (data.success && data.data.authUserValue === "Y") {
        const userDetails = {};
        data.data.keyValuePairs.forEach(pair => {
          switch (pair[0]) {
            case 'USER_ID':
              userDetails.userId = pair[1];
              break;
            case 'Name':
              userDetails.name = pair[1];
              break;
            case 'PrntDeptName':
              userDetails.prntDeptName = pair[1];
              break;
            case 'DeptName':
              userDetails.deptName = pair[1];
              break;
            default:
              break;
          }
        });
        setCurrentUser(userDetails);
        localStorage.setItem("user", JSON.stringify(userDetails));
      } else {
        throw new Error("로그인 실패");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const logout = () => {
    try {
      setCurrentUser(null);
      localStorage.removeItem("user");
    } catch (error) {
      console.error("로그아웃 과정에서 오류 발생:", error);
    }
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


