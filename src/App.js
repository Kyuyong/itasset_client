import React, { useEffect, useState } from "react";
import Main from "./pages/Main";
import Login from "./pages/Login";
import './style.scss';


function App() {

  // 로그인 상태를 localStorage에서 가져옵니다.
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  useEffect(() => {
    // 로그인 상태가 변경될 때마다 localStorage에 저장합니다.
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);



  return (
    <div className="app">
      {isLoggedIn ? (
        <Main onLogout={() => setIsLoggedIn(false)} />
      ) : (
        <Login onLogin={() => setIsLoggedIn(true)} />
      )}
    </div>
  );
}

export default App;
