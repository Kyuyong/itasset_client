import React from 'react'
import { Link } from 'react-router-dom';

export const MiddleNavBar = () => {
  return (
    <nav className="mainMiddleNavBar">
      <div className="navbarContainer">
        <div className="middleIcon">
          <Link to="/">
            <img src={process.env.PUBLIC_URL + "/image/icons/menu_icon_50px.png"} alt="menu_icon" />
          </Link>
        </div>

        <ul className="navLinks">
          <li><Link to="/all">All</Link></li>
          <li><Link to="/?menu=rm">RM</Link></li>
          <li><Link to="/?menu=access">Access</Link></li>
          <li><Link to="/?menu=transfer">전송</Link></li>
          <li><Link to="/?menu=infra">Infra설비</Link></li>
          <li><Link to="/?menu=assets">자산</Link></li>
          <li><Link to="/?menu=so">SO</Link></li>
          <li><Link to="/?menu=management">경영</Link></li>
        </ul>
      </div>
    </nav>
  )
}

export default MiddleNavBar;