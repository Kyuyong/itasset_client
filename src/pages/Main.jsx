import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';

import axios from 'axios';

// Componets List
import MainNavBar from '../components/MainNavBar';
import ScrollToTop from '../components/ScrollToTop';
import Footer from '../components/Footer';

// Page List
import Home from './Home';
import Product from './Product';
import RegisterSol from './RegisterSol';
import Introduction from './Introduction';
import FileUpload from './FileUpload';

export const Main = ({ onLogout }) => {
  // const location = useLocation();
  // const showHome =
  //   !location.pathname.startsWith('/product')
  //   && !location.pathname.startsWith('/introduction')
  //   && !location.pathname.startsWith('/registersol')
  //   && !location.pathname.startsWith('/fileupload')

  ////////////////////////
  // Solution 불러오기 선언구간
  const [getsolutions, setGetSolutions] = useState([]);
  const fetchSolutions = async () => {
    try {
      const response = await axios.get('/solutions/getsolution');
      const sortedSolutions = response.data.sort((a, b) => a.id - b.id);
      setGetSolutions(sortedSolutions);
    } catch (error) {
      console.error("solutions 가져올때 오류가 발생하였습니다:", error);
    }
  };
  useEffect(() => {
    fetchSolutions();
  }, []);
  ////////////////////////

  return (
    <>
      <div className="main">
        <MainNavBar onLogout={onLogout} />
        {/* {showHome && <Home />} */}
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/introduction" element={<Introduction solutionData={getsolutions} />}></Route>
          <Route path="/registersol" element={<RegisterSol />} />
          <Route path="/fileupload" element={<FileUpload />} />
        </Routes>
        <ScrollToTop />
      </div>
      <Footer />
    </>
  )
}

export default Main;