import React, { useEffect, useState } from 'react';
import axios from "axios";
import SolutionBox from './SolutionBox';
import { BsPencil } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';

function getRandomIds(array, size) {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, size).map(item => item.id);
}

export const ProductContent = (props) => {

  let findItem = props.solutionData;
  const [getsolutions, setGetSolutions] = useState([]);

  const fetchSolutions = async () => {
    try {
      const response = await axios.get('/solutions/getsolution');
      setGetSolutions(response.data);
    } catch (error) {
      console.error("solutions 가져올때 오류가 발생하였습니다:", error);
    }
  };
  useEffect(() => {
    fetchSolutions();
  }, []);

  const randomIds = getRandomIds(getsolutions, 3);
  const filteredData = getsolutions.filter(item => randomIds.includes(item.id));

  const navigate = useNavigate();
  const handleEditClick = () => {
    navigate(`/product/${findItem.id}/update`); // ":id"는 실제 제품 ID로 대체해야 합니다.
  };

  const DisplayStyledText = ({ htmlContent }) => {
    const cleanHTML = DOMPurify.sanitize(htmlContent);
    return <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />;
  };

  return (
    <div className="productContent">
      <div className="contentBox">
        <div className="container">
          <div className="innerBox">
            <div className="leftSide">
              <div className="gap-60"></div>
              <div className="titleBox">

                <div className="title">Product Description</div>
                <div className="edit" onClick={handleEditClick}>
                  <BsPencil></BsPencil>
                  <p>내용 수정하기</p>
                </div>
              </div>
              <div className="desc">

                <div className="gap-40"></div>
                <div className="subTitle">추진 방향</div>
                <div className="itemBox">
                  <DisplayStyledText htmlContent={findItem.direc} />
                </div>

                <div className="gap-40"></div>
                <div className="subTitle">과제 대상</div>
                <div className="itemBox">
                  <DisplayStyledText htmlContent={findItem.target} />
                </div>

                <div className="gap-40"></div>
                <div className="subTitle">기대 효과</div>
                <div className="itemBox">
                  <DisplayStyledText htmlContent={findItem.effect} />
                </div>

              </div>
            </div>

            <div className="rightSide">
              <div className="devDesc">
                <div className="developer">
                  {/* <img src={process.env.PUBLIC_URL + "/image/developer/" + findItem.n_id + ".jpg"}
                    className="devImg" alt="devImg" /> */}
                  <img src={process.env.PUBLIC_URL + "/image/developer/person1.png"}
                    className="devImg" alt="devImg" />
                  <div>
                    <span style={{ color: '#585858' }}>{findItem.headquarters} </span>
                    <span style={{ color: '#1CA8DB' }}>{findItem.team} </span>
                    <div className="devNm">{findItem.name}</div>
                  </div>
                </div>

                <hr />

                {/* <div className="lang">
                  <div className="left">
                    <img src={process.env.PUBLIC_URL + "/image/lang_icons/python.png"} className="langIcon" alt="lang1" />
                    <p>python</p>
                  </div>
                  <div className="right">
                    <img src={process.env.PUBLIC_URL + "/image/lang_icons/django.png"} className="langIcon" alt="lang2" />
                    <p>django</p>
                  </div>
                </div> */}

                <div className="langDesc">
                  <table>
                    <tbody>
                      <tr>
                        <td>Version</td>
                        <td>1.0.2</td>
                      </tr>
                      <tr>
                        <td>최근 업데이트</td>
                        <td>2023.08.21</td>
                      </tr>
                      <tr>
                        <td>개발 일자</td>
                        <td>2023.03.05</td>
                      </tr>
                      <tr>
                        <td>Reviews</td>
                        <td>See 551 Reviews</td>
                      </tr>
                    </tbody>
                  </table>
                </div>


              </div>
            </div>
          </div>
        </div>
        <div className="gap-60"></div>
      </div>

      <hr />

      <div className="randomBox">
        <div className="gap-60" />
        <div className="title">Other Solutions</div>
        <div className="solutionsContainer">
          {filteredData.map((item) => (
            <div className="solBox" key={item.id}>
              <SolutionBox
                key={item.id}
                id={item.id}
                solName={item.sol_name}
                solFullName={item.sol_full_name}
                korName={item.kor_name}
                url={item.url}
                img={item.img}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="gap-60"></div>
    </div>
  )
}

export default ProductContent;