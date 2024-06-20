import React, { useContext, useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
// import axios from 'axios';

// Componets List
import MainNavBar from '../components/MainNavBar';
import ScrollToTop from '../components/ScrollToTop';
import Footer from '../components/Footer';

// Page List
import Home from './Home';
import Product from './Product';
import Introduction from './Introduction';

// import Admin from './Admin';
import { AuthContext } from '../context/authContext';
// import RequireAdmin from "../components/RequireAdmin";

export const Main = () => {
  const [getDevelopers, setGetDevelopers] = useState([]);
  const { currentUser } = useContext(AuthContext);

  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/controlpanel');

  ////////////////////////
  // 개발자 목록 가져오기
  const fetchDevelopers = async () => {
    try {
      const response = await axiosInstance.get("/api/developers/getdeveloper");
      setGetDevelopers(response.data);
    } catch (error) {
      console.log("개발자 가져올때 오류가 발생했습니다.", error);
    };
  };
  // useEffect(() => {
  //   fetchDevelopers();
  // }, []);
  useEffect(() => {
    if (currentUser) {
      fetchDevelopers();
    }
  }, [currentUser]);

  // console.log("Main에서 보는 getDevelopers : ", getDevelopers);
  return (
    <>
      <div className="main">
        <MainNavBar />
        <Routes>
          <Route path="*" element={<Home getDevelopers={getDevelopers} />} />
          <Route path="/product/:productId/*" element={<Product getDevelopers={getDevelopers} />} />
          <Route path="/introduction" element={<Introduction />}></Route>
          {/* {currentUser && currentUser.isAdmin && (
            <Route path="/controlpanel/*" element={<RequireAdmin><Admin /></RequireAdmin>} />
          )}
          <Route path="/reg" element={<RegisterSol />} /> */}
        </Routes>
        <ScrollToTop />
      </div>
      {/* <Footer /> */}
      {!isAdminPage && <Footer />}
    </>
  )
}

export default Main;