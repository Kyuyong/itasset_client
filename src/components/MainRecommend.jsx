import React, { useState, useEffect } from 'react';
import SolutionBox from './SolutionBox';
import { Link } from 'react-router-dom';
import { BsFillStarFill } from 'react-icons/bs';

export const MainRecommend = ({ solutionData, developerData }) => {

  //최근 등록된 Solutions
  const [latestSolutions, setLatestSolutions] = useState([]);
  useEffect(() => {
    const sortedSolutions = solutionData.sort((a, b) => new Date(b.Date) - new Date(a.Date));
    setLatestSolutions(sortedSolutions.slice(0, 4));
  }, [solutionData]);

  //좋아요 등록수 많은 Solutions
  const [topLikedSolutions, setTopLikedSolutions] = useState([]);
  useEffect(() => {
    const sortedByLikes = solutionData.sort((a, b) => parseInt(b.likeCnt, 10) - parseInt(a.likeCnt, 10));
    setTopLikedSolutions(sortedByLikes.slice(0, 4));
  }, [solutionData]);

  //랜덤으로 개발자 소개 (3명)
  const randomIds = getRandomIds(developerData, 3);
  const filteredData = developerData.filter(item => randomIds.includes(item.id));
  function getRandomIds(array, size) {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, size).map(item => item.id);
  }

  return (
    <div className="mainRecommend">
      <div className="gap-100" />

      <div className="titleText">New Solution</div>
      <div className="subText">새로운 AI/DT Solution를 공유합니다.</div>

      <div className="newBox">
        <div className="leftSide">
          <div className="circleImg">
            <img className="animation-updown" src={process.env.PUBLIC_URL +
              "/image/main/circle_01.png"} alt="circle_01" />
          </div>
          <p className="text">새로운 AI/DT Solution을 <br></br> 만나보세요.</p>
          <p className="subText">The Best AI/DT Solution and System have arrived.</p>
          {/* <button type="button" class="newBtn">See all products</button> */}
        </div>
        <div className="rightSide">
          <div className="solutionsContainer">
            <div className="solutionsRow">
              {latestSolutions.slice(0, 2).map((solution) => (
                <div className="solutionColumn" key={solution.id}>
                  <SolutionBox
                    id={solution.id}
                    solName={solution.sol_name}
                    solFullName={solution.sol_full_name}
                    korName={solution.kor_name}
                    url={solution.url}
                  />
                </div>
              ))}
            </div>
            <div className="solutionsRow">
              {latestSolutions.slice(2, 4).map((solution) => (
                <div className="solutionColumn" key={solution.id}>
                  <SolutionBox
                    id={solution.id}
                    solName={solution.sol_name}
                    solFullName={solution.sol_full_name}
                    korName={solution.kor_name}
                    url={solution.url}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="gap-60"></div>
      <hr />
      <div className="gap-60"></div>

      <div className="mainBanner">
        <p className="text">Creative AI/DT Solution Courses</p>
        <p className="subText">‘23년 새로운 AI/DT Solution 및 과제를 소개합니다.</p>
        <hr className="line" />
        <p className="subText"> No. 1 기술전문회사로 도약하기 위해서 우리의 본업인 현장 경쟁력 강화를 위해 AI/DT전문가 양성하였습니다. <br></br>
          우리 회사 IT 전문가들의 잠재능력을 유감없이 보여주는 여러가지 사례와 과제들을 확인해보세요.</p>
        <button type="button" class="bannerBtn">
          <Link to="/introduction" className="text">See More</Link>
        </button>
      </div>

      <div className="gap-60"></div>
      <hr />
      <div className="gap-60"></div>

      <div className="titleText">Popular AI/DT Solutions</div>
      <div className="subText">인기가 있고, 사용률이 높은 Solution입니다.</div>

      <div className="popularBox">
        <div className="leftSide">
          <div className="solutionsContainer">
            <div className="solutionsRow">
              {topLikedSolutions.slice(0, 2).map((solution) => (
                <div className="solutionColumn" key={solution.id}>
                  <SolutionBox
                    id={solution.id}
                    solName={solution.sol_name}
                    solFullName={solution.sol_full_name}
                    korName={solution.kor_name}
                    url={solution.url}
                  />
                </div>
              ))}
            </div>
            <div className="solutionsRow">
              {topLikedSolutions.slice(2, 4).map((solution) => (
                <div className="solutionColumn" key={solution.id}>
                  <SolutionBox
                    id={solution.id}
                    solName={solution.sol_name}
                    solFullName={solution.sol_full_name}
                    korName={solution.kor_name}
                    url={solution.url}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="rightSide">
          <div className="circleImg">
            <img className="animation-updown" src={process.env.PUBLIC_URL +
              "/image/main/circle_02.png"} alt="circle_01" />
          </div>
          <p className="text">인기있는 AI/DT Solution을 <br></br> 만나보세요.</p>
          <p className="subText">The Best Solutions and System have arrived.</p>
          {/* <button type="button" class="btn btn-light mostpopular-btn">See all products</button> */}
        </div>
      </div>

      <div className="gap-60"></div>
      <hr />
      <div className="gap-60"></div>


      <div className="joinUsBox">
        <div className="leftSide">
          {[...Array(5)].map((_, index) => (
            <BsFillStarFill key={index} style={{ color: '#EFC42D', margin: '2px' }} />
          ))}
          <p className="title">AI/DT 개발자를 소개합니다.</p>
          <p>SK오앤에스는 40명의 AI/DT전문가와 함께 성장하고 있습니다.
            현장 업무에 필요한 여러가지 아이디어 발굴을 통해서,
            새로운 New Vision과 Value 찾아가는데 노력을 하고 있습니다.
            언제든지 AI/DT전문가의 능력이 필요하면 연락주세요.</p>
        </div>
        <div className="rightSide">
          {filteredData.map((developer) => (
            <div className="devBox">
              <img src={process.env.PUBLIC_URL + "/image/developer/"
                + developer.n_id + ".jpg"}
                className="personCircle" alt="developer_img" />
              <p>{developer.comment}</p>
              <p className="name">{developer.developer}</p>
              <p className="team">{developer.team}</p>
            </div>
          ))}
        </div>
      </div>


      <div className="gap-100"></div>

    </div>
  )
}

export default MainRecommend;