import React, { useContext, useEffect } from "react";
import Main from "./pages/Main";
import Login from "./pages/Login";
import './style.scss';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./context/authContext";


function App() {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  // useEffect(() => {
  //   if (currentUser) {
  //     localStorage.setItem("isLoggedIn", "true");
  //   } else {
  //     localStorage.setItem("isLoggedIn", "false");
  //     navigate('/login'); // currentUser가 null이면 로그인 페이지로 리디렉션
  //   }
  // }, [currentUser, navigate]);

  // // 로그인 상태를 localStorage에서 가져옵니다.
  // const [isLoggedIn, setIsLoggedIn] = useState(
  //   localStorage.getItem("isLoggedIn") === "true"
  // );

  // useEffect(() => {
  //   // 로그인 상태가 변경될 때마다 localStorage에 저장합니다.
  //   localStorage.setItem("isLoggedIn", isLoggedIn);
  // }, [isLoggedIn]);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login"); // currentUser가 null이면 로그인 페이지로 이동
    }
  }, [currentUser, navigate]);

  // return (
  //   <div className="app">
  //     {isLoggedIn ? (
  //       <Main onLogout={() => setIsLoggedIn(false)} />
  //     ) : (
  //       <Login onLogin={() => setIsLoggedIn(true)} />
  //     )}
  //   </div>
  // );
  return (
    <div className="app">
      {currentUser ? (
        <Main />
      ) : (
        <Login />
      )}
    </div>
  );


}

export default App;
