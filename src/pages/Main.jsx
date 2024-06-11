import React, { useContext, useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom';

import axios from 'axios';

// Componets List
import MainNavBar from '../components/MainNavBar';
import ScrollToTop from '../components/ScrollToTop';
import Footer from '../components/Footer';
import RequireAdmin from "../components/RequireAdmin";

// Page List
import Home from './Home';
import Product from './Product';
import Introduction from './Introduction';
import FileUpload from './FileUpload';
import Admin from './Admin';
// import RegisterSol from './RegisterSol';
import { AuthContext } from '../context/authContext';
import IdeaBorad from './IdeaBoard/IdeaBorad';
import SolMgmt from './SolMgmt/SolMgmt';
import DashBoard from './DashBoard/DashBoard';

export const Main = () => {
  const [getDevelopers, setGetDevelopers] = useState([]);
  const { currentUser } = useContext(AuthContext);

  ////////////////////////
  // Solution 목록 가져오기
  // const [getsolutions, setGetSolutions] = useState([]);
  // const fetchSolutions = async () => {
  //   try {
  //     const response = await axios.get('/api/solutions/getsolution');
  //     const sortedSolutions = response.data.sort((a, b) => a.id - b.id);
  //     setGetSolutions(sortedSolutions);
  //   } catch (error) {
  //     console.error("solutions 가져올때 오류가 발생하였습니다:", error);
  //   }
  // };
  // useEffect(() => {
  //   fetchSolutions();
  // }, []);
  ////////////////////////

  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/controlpanel');

  ////////////////////////
  // 개발자 목록 가져오기
  const fetchDevelopers = async () => {
    try {
      const response = await axios.get("/api/developers/getdeveloper");
      setGetDevelopers(response.data);
    } catch (error) {
      console.log("개발자 가져올때 오류가 발생했습니다.", error);
    };
  };
  useEffect(() => {
    fetchDevelopers();
  }, []);

  // console.log("Main에서 보는 getDevelopers : ", getDevelopers);
  return (
    <>
      <div className="main">
        <MainNavBar />
        <Routes>
          <Route path="*" element={<Home getDevelopers={getDevelopers} />} />
          <Route path="/product/:productId/*" element={<Product getDevelopers={getDevelopers} />} />
          <Route path="/introduction" element={<Introduction />}></Route>
          {currentUser && currentUser.isAdmin && (
            <Route path="/controlpanel/*" element={<RequireAdmin><Admin /></RequireAdmin>} />
          )}
          {/* <Route path="/reg" element={<RegisterSol />} /> */}
          <Route path="/fileupload" element={<FileUpload />} />
          <Route path="/idearegister" element={<IdeaBorad />} />
          <Route path="/solmgmt" element={<SolMgmt />} />
          <Route path="/dashboard" element={<DashBoard />} />
        </Routes>
        <ScrollToTop />
      </div>
      {/* <Footer /> */}
      {!isAdminPage && <Footer />}
    </>
  )
}

export default Main;