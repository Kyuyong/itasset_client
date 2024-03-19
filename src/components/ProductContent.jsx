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

export const ProductContent = ({ solutionData, productId }) => {

  const navigate = useNavigate();
  const [getsolutions, setGetSolutions] = useState([]);
  const randomIds = getRandomIds(getsolutions, 3);
  const filteredData = getsolutions.filter(item => randomIds.includes(item.id));
  // console.log("solutionData로 들어온 값:", solutionData);

  useEffect(() => {
    const fetchSolutions = async () => {
      try {
        const response = await axios.get('/api/solutions/getsolution');
        setGetSolutions(response.data);
      } catch (error) {
        console.error("solutions 가져올때 오류가 발생하였습니다:", error);
      }
    };
    fetchSolutions();
  }, []);

  const handleEditClick = () => {
    navigate(`/product/${productId}/update`);
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
                  <DisplayStyledText htmlContent={solutionData.direc} />
                </div>

                <div className="gap-40"></div>
                <div className="subTitle">과제 대상</div>
                <div className="itemBox">
                  <DisplayStyledText htmlContent={solutionData.target} />
                </div>

                <div className="gap-40"></div>
                <div className="subTitle">기대 효과</div>
                <div className="itemBox">
                  <DisplayStyledText htmlContent={solutionData.effect} />
                </div>

              </div>
            </div>

            <div className="rightSide">
              <div className="devDesc">
                <div className="developer">
                  {/* <img src={process.env.PUBLIC_URL + "/image/developer/" + solutionData.n_id + ".jpg"}
                    className="devImg" alt="devImg" /> */}
                  <img src={process.env.PUBLIC_URL + "/image/developer/person1.png"}
                    className="devImg" alt="devImg" />
                  <div>
                    <span style={{ color: '#585858' }}>{solutionData.headquarters} </span>
                    <span style={{ color: '#1CA8DB' }}>{solutionData.team} </span>
                    <div className="devNm">{solutionData.name}</div>
                  </div>
                </div>

                <hr />

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
                        <td>{solutionData.reg_date}</td>
                      </tr>
                      <tr>
                        <td>Reviews</td>
                        <td>See 551 Reviews</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="devIntro">
                  <div className="title">개발자 소개</div>
                  <div className="desc">
                    저는 AI/DT 분야의 전문가로, SK오앤에스에서 최고가 되고자 합니다. Python, Django, SQL을 능숙하게 다루며, 이 기술들을 활용하여 회사의 비전과 목표 달성에 기여하고자 합니다. 기술적 능력뿐만 아니라, 지속 가능한 성장과 혁신을 통해 SK오앤에스의 미래를 모양질 수 있는 핵심 인재가 되겠습니다. 회사의 성장과 함께 제 개인적인 발전도 이루며, 업계에서 인정받는 전문가로서의 길을 걸을 준비가 되어 있습니다.
                  </div>
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