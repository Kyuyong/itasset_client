import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import MainContents from "../components/MainContents";
import MiddleNavBar from "../components/MiddleNavBar";
import MainRecommend from "../components/MainRecommend";
import SearchList from "../components/SearchList";
import SolutionList from '../components/SolutionList';

import solutionData from '../json/solutiondata.json';
import developerData from '../json/developerdata.json';

export const Home = () => {

  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (results) => {
    setSearchResults(results);
    navigate("/search");
  };


  return (
    <div className="home">
      <MainContents solutionData={solutionData} onSearch={handleSearch} />
      <MiddleNavBar />
      <Routes>
        <Route path="/search" element={<SearchList searchResults={searchResults} />} />
        <Route path="/all" element={<SolutionList solutionData={solutionData} />} />
        <Route path="/" element={<MainRecommend solutionData={solutionData} developerData={developerData} />} />
      </Routes>
    </div>
  )
}
export default Home;