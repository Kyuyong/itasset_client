import React, { createContext, useCallback, useEffect, useState } from 'react'
import axios from 'axios';
export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    // JSON.parse(localStorage.getItem("user")) || null
    JSON.parse(sessionStorage.getItem("user")) || null
  );


  const login = async ({ username, password }) => {
    try {
      // const response = await axios.post("/api/login", { username, password });
      const response = await axios.post("/api/login", { username, password });
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

        // Admin 여부 확인 요청 추가
        const adminResponse = await axios.get("/api/developers/getadmin");
        userDetails.isAdmin = adminResponse.data.some(admin => admin.n_id === userDetails.userId);


        setCurrentUser(userDetails);
        // localStorage.setItem("user", JSON.stringify(userDetails));
        sessionStorage.setItem("user", JSON.stringify(userDetails));

        // 로그인 시간을 저장합니다. 
        const loginTime = new Date().getTime();
        sessionStorage.setItem("loginTime", loginTime.toString());

      } else {
        throw new Error("로그인 실패");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const checkSessionTimeout = useCallback(() => {
    const loginTime = sessionStorage.getItem("loginTime");
    const currentTime = new Date().getTime();

    // 30분을 밀리초로 환산합니다.
    const timeout = 30 * 60 * 1000;

    if (loginTime && (currentTime - loginTime > timeout)) {
      logout();
    }
  }, []); // useCallback 의존성 배열이 비어 있으므로, 컴포넌트가 마운트될 때 한 번만 생성됩니다.


  const logout = () => {
    try {
      setCurrentUser(null);
      // localStorage.removeItem("user");
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("loginTime");
    } catch (error) {
      console.error("로그아웃 과정에서 오류 발생:", error);
    }
  };

  useEffect(() => {
    // localStorage.setItem("user", JSON.stringify(currentUser));
    sessionStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    checkSessionTimeout();
    const interval = setInterval(checkSessionTimeout, 5 * 60 * 1000); // 5분마다 세션 타임아웃을 확인합니다.
    return () => clearInterval(interval);
  }, [checkSessionTimeout]); // useEffect 의존성 배열에 checkSessionTimeout를 추가합니다.


  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}


