import React, { useEffect, useState } from 'react';
import { BsFillStarFill } from 'react-icons/bs';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import ProductContent from '../components/ProductContent';
import ProductReviews from '../components/ProductReviews';
import ProductUpdate from '../components/ProductUpdate';
import axios from 'axios';
import { Button, IconButton } from '@mui/material';
import { pink } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';



export const Product = ({ getDevelopers }) => {
  const navigate = useNavigate();
  const [reviewCnt, setReviewCnt] = useState([]);

  const [likeCount, setLikeCount] = useState(0);
  const handleLike = () => {
    setLikeCount(likeCount + 1);
  };

  ////////////////////////
  // Product ID 기준 불러오기
  const [product, getProduct] = useState([]);
  const { productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/solutions/getsolution/${productId}`);
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

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await axios.get(`/api/reviews/getreview?sol_id=${productId}`);
        setReviewCnt(response.data);
      } catch (error) {
        console.error("댓글 가져올때 오류가 발생했습니다.", error);
      };
    };
    fetchReview();
  }, [productId]);

  // console.log("reviewCnt : ", reviewCnt.length)

  // console.log("Product에서 보는 product : ", product);
  // console.log("Product에서 보는 productId : ", productId);
  // console.log("Product에서 보는 getDevelopers : ", getDevelopers);


  return (
    <div className="product" >
      <div className="mainBox">
        <div className="mainBg">
          <div className="innerContainer">
            <div className="leftSide">
              <div className="imgBox">
                {product && product.img && (
                  <img src={process.env.PUBLIC_URL + product.img} alt="newsolution-box" />
                )}
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
              <div className="like">
                Reviews : <span style={{ color: '#f06292' }}>{reviewCnt?.length}</span> 개
              </div>
              <hr />
              <div className="btns">
                <button className="proBtn" onClick={goToSolution}>
                  Solution 안내
                </button>
                <button className="proBtn" onClick={goToReviews}>
                  Reviews 보기
                </button>
              </div>

              <div className="scoreBox">
                <Button variant="contained" className="likeBtn"
                  onClick={handleLike} sx={{ backgroundColor: pink[300] }}>
                  마음에 들면 좋아요
                </Button>
                <IconButton sx={{ color: pink[500] }}>
                  <FavoriteIcon />
                </IconButton>
                <p>{likeCount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<ProductContent solutionData={product} productId={productId} getDevelopers={getDevelopers} />} />
        <Route path="/reviews" element={<ProductReviews productId={productId} />} />
        <Route path="/update" element={<ProductUpdate solutionData={product} productId={productId} getDevelopers={getDevelopers} />} />
      </Routes>
    </div>
  )
}

export default Product;
