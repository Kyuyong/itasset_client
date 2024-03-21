import React, { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom';

import axios from 'axios';

// Componets List
import MainNavBar from '../components/MainNavBar';
import ScrollToTop from '../components/ScrollToTop';
import Footer from '../components/Footer';

// Page List
import Home from './Home';
import Product from './Product';
import Introduction from './Introduction';
import FileUpload from './FileUpload';
import Admin from './Admin';
import RegisterSol from './RegisterSol';

export const Main = () => {
  const [getDevelopers, setGetDevelopers] = useState([]);

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
  const isAdminPage = location.pathname.startsWith('/admin');

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
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/reg" element={<RegisterSol />} />
          <Route path="/fileupload" element={<FileUpload />} />
        </Routes>
        <ScrollToTop />
      </div>
      {/* <Footer /> */}
      {!isAdminPage && <Footer />}
    </>
  )
}

export default Main;