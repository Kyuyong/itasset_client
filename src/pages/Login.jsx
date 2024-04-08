// import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
// import  { useEffect, useRef } from 'react';



export const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();
  // const logoutTimerRef = useRef();

  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login({ username, password });
      console.log('로그인 성공', username);
      // onLogin(true); // 로그인 상태를 true로 설정
      navigate('/'); // 사용자를 홈 페이지로 리디렉션
    } catch (error) {
      console.error('로그인 요청 중 에러 발생:', error);
      setLoginError(true); // 로그인 실패 처리
    }
  };

  return (
    <div className="loginContainer">


      <div className="leftSide">
        <div className="logoName">Orion</div>

      </div>

      <div className="rightSide">
        <div className="logoBox">
          <img src={`${process.env.PUBLIC_URL}/image/logo/OroinLogoColor.png`} alt="mainLogo" />
          <div className="loginTitle">Welcome to You!</div>
        </div>

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
              autoComplete="off"
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