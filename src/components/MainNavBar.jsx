import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { BsLockFill, BsGearFill } from 'react-icons/bs';


export const MainNavBar = ({ onLogout }) => {

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
          <div className="menu">
            <BsGearFill size={24} />
            <span>Setting</span>
          </div>
          <div className="menu" onClick={onLogout}>
            <BsLockFill size={24} />
            <span>Logout</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainNavBar;