import React, { useEffect } from 'react'
import SolutionBox from '../components/SolutionBox';


export const Introduction = ({ solutionData }) => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  console.log(solutionData);

  return (
    <div className="introduction">
      <div className="mainBox">
        <div className="mainBg">
          <div className="innerContainer">
            <div className="textBox">
              <h1>Creative AI/DT Solution Courses</h1>
              <div className="gap-20" />
              <p>
                ‘23년 새로운 AI/DT Solution 및 과제를 소개합니다.
              </p>
              <hr />
              <p>No. 1 기술전문회사로 도약하기 위해서 우리의 본업인 현장 경쟁력 강화를 위해 AI/DT전문가 양성하였습니다. <br></br>
                우리 회사 IT 전문가들의 잠재능력을 유감없이 보여주는 여러가지 사례와 과제들을 확인해보세요.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="contentsBox">
        <div className="gap-40"></div>
        <div className="titleText">AI/DT Working Group Solution</div>
        <div className="subText">'23년 30명의 AI/DT 전문가가 만든 과제를 소개합니다.</div>

        <div className="card">
          {solutionData.map((solution) => (
            <div className="cardBox" key={solution.id}>
              <div className="solBox">
                <SolutionBox
                  key={solution.id}
                  id={solution.id}
                  solName={solution.sol_name}
                  solFullName={solution.sol_full_name}
                  korName={solution.kor_name}
                  url={solution.url}
                  img={solution.img}
                />
              </div>

              <div className="descBox">
                <div className="title">Product 과제 설명</div>
                <div className="content">
                  <p>Material Dashboard 2 React is our newest free MUI Admin Template based on React. If you’re a
                    developer looking to create an admin dashboard that is developer-friendly, rich with features, and
                    highly customisable, here is your match. Our innovative MUI &amp; React dashboard comes with a
                    beautiful design inspired by Google&#39;s Material Design and it will help you create stunning
                    websites </p>
                </div>
              </div>

              <div className="devBox">
                <div className="ellipse" />
                <div className="rect1" />
                <div className="rect2">
                  <img src={process.env.PUBLIC_URL + "/image/developer/N1102216.jpg"}
                    className="circle " alt="devImg" />
                  <div className="nameTag">
                    <span>AI/DT추진팀</span>
                    <span>조규용</span>
                  </div>
                </div>
                <div className="rect3" />
              </div>
            </div>
          ))}
          <div className="gap-60"></div>
        </div>

      </div>


    </div>
  )
}

export default Introduction;