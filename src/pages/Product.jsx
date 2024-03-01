import React, { useState } from 'react';
import { BsFillStarFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import ProductContent from '../components/ProductContent';
import ProductReviews from '../components/ProductReviews';


export const Product = (props) => {

  let { id } = useParams();
  const [showReviews, setShowReviews] = useState(false); // 리뷰 보기 상태 관리

  let findItem = props.solutionData.find(function (solutionData) {
    return solutionData.id === id;
  });

  return (
    <div className="product">
      <div className="mainBox">
        <div className="mainBg">
          <div className="innerContainer">
            <div className="leftSide">
              <div className="imgBox">
                <img src={process.env.PUBLIC_URL + "/image/solution/solution" + findItem.id + ".png"}
                  alt="newsolution-box" />
              </div>
              <div className="btnList">
                {/* <button className="systemBtn">
                  <span>
                    <img style={{ height: '30px', width: '30px' }}
                      src={process.env.PUBLIC_URL + "/image/icons/monitor-icon.png"}
                      alt="github-mark" />
                  </span>
                  <span>
                    <a href={findItem.url} style={{ marginLeft: "10px" }}
                      target="_blank" rel="noopener noreferrer">시스템 바로가기</a>
                  </span>
                </button>
                <button className="githubBtn">
                  <span>
                    <img style={{ height: '26px', width: '26px' }}
                      src={process.env.PUBLIC_URL + "/image/icons/github-mark.png"}
                      alt="github-mark" />
                  </span>
                  <span>
                    <a href={findItem.github_url} style={{ marginLeft: "10px" }}
                      target="_blank" rel="noopener noreferrer"> GitHub Code</a>
                  </span>
                </button> */}
                <a
                  className="systemBtn"
                  href={findItem.url}
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
                  href={findItem.github_url}
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
              <p className="title">{findItem.sol_name}</p>
              <p className="fullNm">{findItem.sol_full_name}</p>
              <p className="titlekr">{findItem.kor_name}</p>
              <div className="gap-20"></div>
              <div>
                {[...Array(5)].map((_, index) => (
                  <BsFillStarFill key={index} style={{ color: '#EFC42D', margin: '2px' }} />
                ))}
              </div>
              <div className="like"> 4,905 (551 Reviews)</div>
              <hr />
              <div className="proBtn" onClick={() => setShowReviews(!showReviews)}>
                <button  >
                  {showReviews ? 'Solution 소개' : 'Reviews 보기'}
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
      {showReviews ? <ProductReviews /> : <ProductContent solutionData={props.solutionData} />}
    </div>
  )
}

export default Product;
