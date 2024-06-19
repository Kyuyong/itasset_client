import "./portNavbar.scss";
import Sidebar from '../Sidebar/Sidebar';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";


import { LuClipboardEdit } from "react-icons/lu";
import { BsClipboardData } from "react-icons/bs";
import { AiOutlineDashboard } from "react-icons/ai";

const PortNavbar = () => {
  return (
    <div className="portNavbar">
      <Sidebar />
      <div className="wrapper">
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <Link to="/" className="logo">
            <img src="/image/logo/OrionLogoWhite.png" alt="LOGO" />
          </Link>
        </motion.span>
        <div className="controls">
          <Link to="/idearegister" className="menu regLink">
            <LuClipboardEdit size={24} />
          </Link>
          <Link to="/solmgmt" className="menu regLink">
            <BsClipboardData size={24} />
          </Link>
          <Link to="/dashboard" className="menu regLink">
            <AiOutlineDashboard size={24} />
          </Link>
          {/* <span>Idea 등록</span>
          <span>Sol Mgmt</span>
          <span>DashBoard</span>
          <span>Admin 관리</span>
          <span>User Name</span> */}
        </div>
      </div>
    </div>
  )
}

export default PortNavbar