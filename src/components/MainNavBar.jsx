import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { BsLockFill } from 'react-icons/bs';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { AuthContext } from '../context/authContext';


export const MainNavBar = () => {

  const { currentUser, logout } = useContext(AuthContext);
  const [scrolled, setScrolled] = useState(false);

  const [logoImage, setLogoImage] = useState(`${process.env.PUBLIC_URL}/image/logo/OrionW.png`);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 100;
      setScrolled(isScrolled);
      if (isScrolled) {
        setLogoImage(`${process.env.PUBLIC_URL}/image/logo/Orion.png`);
      } else {
        setLogoImage(`${process.env.PUBLIC_URL}/image/logo/OrionW.png`);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`mainNavbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="inner">
        <div className="logo">
          <Link to="/" className="link">
            <img src={logoImage} alt="mainLogo" />
          </Link>
        </div>
        <div className="controls">
          {currentUser.isAdmin && ( // currentUser.isAdmin을 사용하여 조건부 렌더링
            <Link to="/admin" className="menu regLink">
              <AppRegistrationIcon size={24} />
              <span>Admin 관리</span>
            </Link>
          )}
          {/* <Link to="/admin" className="menu regLink">
            <AppRegistrationIcon size={24} />
            <span>Admin 관리</span>
          </Link> */}
          <div className="menu" onClick={logout}>
            <BsLockFill size={24} />
            <span>{currentUser.name}님 Logout</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainNavBar;