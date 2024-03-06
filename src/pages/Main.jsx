import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom';

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

// Solution Data List (json file)
import solutionData from '../json/solutiondata.json';


export const Main = ({ onLogout }) => {


  const location = useLocation();
  const showHome =
    !location.pathname.startsWith('/product')
    && !location.pathname.startsWith('/introduction')
    && !location.pathname.startsWith('/registersol')
    && !location.pathname.startsWith('/fileupload')

  return (
    <>
      <div className="main">

        <MainNavBar onLogout={onLogout} />
        {showHome && <Home />}
        <Routes>
          <Route path="/product/:id" element={<Product solutionData={solutionData} />} />
          <Route path="/introduction" element={<Introduction solutionData={solutionData} />}></Route>
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