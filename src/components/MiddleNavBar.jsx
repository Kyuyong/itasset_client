import React from 'react'

export const MiddleNavBar = () => {
  return (
    <div className="mainMiddleNavBar">
      <div class="navbarContainer">
        <div className="middleIcon">
          <img src={process.env.PUBLIC_URL + "/image/icons/menu_icon_50px.png"} alt="menu_icon" />
        </div>

        <ul class="navLinks">
          <li><a href="/sollist">All</a></li>
          <li><a href="#rm">RM</a></li>
          <li><a href="#access">Access</a></li>
          <li><a href="#transfer">전송</a></li>
          <li><a href="#infra">Infra설비</a></li>
          <li><a href="#assets">자산</a></li>
          <li><a href="#so">SO</a></li>
          <li><a href="#management">경영</a></li>
        </ul>
      </div>
    </div>
  )
}

export default MiddleNavBar;