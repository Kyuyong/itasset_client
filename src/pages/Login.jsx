import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';  //재로그인 로직을 위한 네비게이터
import accountList from '../json/acountlist.json';

export const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const logoutTimerRef = useRef();  // 자동 로그아웃 타이머 로직
  const navigate = useNavigate(); //재로그인 로직을 위한 네비게이터


  const handleLogin = (e) => {
    e.preventDefault();
    const accountExists =
      accountList.some(account => account.id === username && account.password === password);

    if (accountExists) {
      clearTimeout(logoutTimerRef.current); // 기존 타이머 클리어
      onLogin(true);
      navigate('/');  // 재로그인을 해도 '/'로 이동하게 하는 로직
      // 로그인 성공 시, 30분 후 자동 로그아웃 타이머 설정
      logoutTimerRef.current = setTimeout(() => {  // 자동 로그아웃 타이머 로직
        handleLogout();
      }, 1800000); // 30 minutes  1800000
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    onLogin(false); // 로그인 상태 변경
    // 필요한 경우, 로그인 페이지로 리디렉션하는 로직 추가
    clearTimeout(logoutTimerRef.current); // 로그아웃 시 타이머 초기화
  };

  // 컴포넌트 언마운트 시 타이머 클리어
  useEffect(() => {
    return () => clearTimeout(logoutTimerRef.current);
  }, []);





  return (
    <div className="loginContainer">


      <div className="leftSide">
        <div className="logoName">IT Asset</div>

      </div>

      <div className="rightSide">

        <div className="loginTitle">Welcome to IT Asset!</div>

        <form onSubmit={handleLogin} >
          <div className="inputName">사번</div>
          <div className="inputWrap">
            <input
              type="text"
              placeholder="N+사번을 입력하세요."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="inputName" >비밀번호</div>
          <div className="inputWrap">
            <input
              type="password"
              placeholder="i-net 비밀번호를 입력하세요."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {loginError && <div className="errorMessageWrap">로그인 정보가 올바르지 않습니다.</div>}
          <div>
            <button className="bottomButton" type="submit">로그인</button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default Login;