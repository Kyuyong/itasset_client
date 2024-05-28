import React from 'react';
import RegisterSol from '../components//RegisterSol';
import RegisterDev from '../components/RegisterDev';
import AdminMgmt from '../components/AdminMgmt';
import { Link, Route, Routes } from 'react-router-dom';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';


export const Admin = () => {

  return (
    <div className="admin">
      <div className="box">
        <div className="bg" />
      </div>
      <div className="content">
        <div className="menuSection">
          <ul>
            <li><Link to="/controlpanel/" className="menuNm">
              <IntegrationInstructionsIcon />Solution 등록
            </Link></li>
            <li><Link to="/controlpanel/registerdev" className="menuNm">
              <AssignmentIndIcon />개발자 등록
            </Link></li>
            <li><Link to="/controlpanel/adminmgmt" className="menuNm">
              <AdminPanelSettingsIcon />Admin 계정 관리
            </Link></li>
          </ul>
        </div>

        <div className="contentSetion">
          <Routes>
            <Route path="/" element={<RegisterSol />} />
            <Route path="/registerdev" element={<RegisterDev />} />
            <Route path="/adminmgmt" element={<AdminMgmt />} />
          </Routes>

        </div>


      </div>
    </div>

  )
}


export default Admin;
