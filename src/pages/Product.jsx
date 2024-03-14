import React, { useEffect, useState } from 'react';
import { BsFillStarFill } from 'react-icons/bs';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import ProductContent from '../components/ProductContent';
import ProductReviews from '../components/ProductReviews';
import ProductUpdate from '../components/ProductUpdate';
import axios from 'axios';


export const Product = () => {
  const location = useLocation();
  const navigate = useNavigate();


  ////////////////////////
  // Product ID 기준 불러오기
  const [product, getProduct] = useState([]);
  const productId = location.pathname.split("/")[2];


  useEffect(() => {
    // 데이터 불러오기 함수
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/solutions/getsolution/${productId}`);
        getProduct(response.data[0]);
      } catch (error) {
        console.error("solutions 가져올때 오류가 발생하였습니다:", error);
      }
    };
    fetchProduct();
  }, [productId]);
  ////////////////////////

  const goToReviews = () => {
    navigate(`/product/${productId}/reviews`);
  };
  const goToSolution = () => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="product" >
      <div className="mainBox">
        <div className="mainBg">
          <div className="innerContainer">
            <div className="leftSide">
              <div className="imgBox">
                {/* <img src={process.env.PUBLIC_URL + product.img}
                  alt="newsolution-box" /> */}
                {product && <img src={process.env.PUBLIC_URL + product.img} alt="newsolution-box" />}

              </div>
              <div className="btnList">

                <a
                  className="systemBtn"
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    style={{ verticalAlign: 'middle', height: '30px', width: '30px', marginRight: '10px' }}
                    src={process.env.PUBLIC_URL + "/image/icons/monitor-icon.png"}
                    alt="system-link"
                  />
                  시스템 바로가기
                </a>

                <a
                  className="githubBtn"
                  href={product.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    style={{ verticalAlign: 'middle', height: '26px', width: '26px', marginRight: '10px' }}
                    src={process.env.PUBLIC_URL + "/image/icons/github-mark.png"}
                    alt="github-link"
                  />
                  GitHub Code
                </a>

              </div>
            </div>

            <div className="rightSide">
              <p className="title">{product.sol_name}</p>
              <p className="fullNm">{product.sol_full_name}</p>
              <p className="titlekr">{product.kor_name}</p>
              <div className="gap-20"></div>
              <div>
                {[...Array(5)].map((_, index) => (
                  <BsFillStarFill key={index} style={{ color: '#EFC42D', margin: '2px' }} />
                ))}
              </div>
              <div className="like"> 4,905 (551 Reviews)</div>
              <hr />
              <div className="btns">
                <button className="proBtn" onClick={goToSolution}>
                  Solution 안내
                </button>
                <button className="proBtn" onClick={goToReviews}>
                  Reviews 보기
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
      <Routes>
        <Route path="/" element={<ProductContent solutionData={product} />} />
        <Route path="/reviews" element={<ProductReviews />} />
        <Route path="/update" element={<ProductUpdate solutionData={product} />} />
      </Routes>
    </div>
  )
}

export default Product;
