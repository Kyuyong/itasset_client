import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { BsLockFill } from 'react-icons/bs';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { AuthContext } from '../context/authContext';


export const MainNavBar = () => {

  const { logout } = useContext(AuthContext);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 100;
      setScrolled(isScrolled);
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
          <Link to="/" className="link">IT Asset</Link>
        </div>
        <div className="controls">
          <Link to="/registersol" className="menu regLink">
            <AppRegistrationIcon size={24} />
            <span>Register Sol.</span>
          </Link>
          <div className="menu" onClick={logout}>
            <BsLockFill size={24} />
            <span>Logout</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainNavBar;