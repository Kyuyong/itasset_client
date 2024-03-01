import React from 'react'
import { useParams } from 'react-router-dom';
import SolutionBox from './SolutionBox';

// 배열에서 랜덤으로 특정 개수의 요소를 추출하는 함수
function getRandomIds(array, size) {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, size).map(item => item.id);
}

export const ProductContent = (props) => {
  let { id } = useParams();

  let findItem = props.solutionData.find(function (solutionData) {
    return solutionData.id === id;
  });

  // 3개의 랜덤 아이디를 추출
  const randomIds = getRandomIds(props.solutionData, 3);
  const filteredData = props.solutionData.filter(item => randomIds.includes(item.id));

  return (
    <div className="productContent">
      <div className="contentBox">
        <div className="container">
          <div className="innerBox">
            <div className="leftSide">
              <div className="gap-60"></div>
              <div className="title">Product Description</div>
              <div className="desc">

                <div className="gap-40"></div>
                <div className="subTitle">추진 방향</div>
                <p>
                  Each element is well presented in very complex documentation.
                  You can read more about the documentation here.
                  If you want to get inspiration or just show something directly to your clients,
                  you can jump-start your development with our pre-built example pages.
                  You will be able to quickly set up the basic structure for your web project.
                  Each element is well presented in very complex documentation.
                  You can read more about the documentation here.
                  If you want to get inspiration or just show something directly to your clients,
                  you can jump-start your development with our pre-built example pages.
                  You will be able to quickly set up the basic structure for your web project.
                  Each element is well presented in very complex documentation.
                  You can read more about the documentation here.
                  If you want to get inspiration or just show something directly to your clients,
                  you can jump-start your development with our pre-built example pages.
                  You will be able to quickly set up the basic structure for your web project.
                </p>


                <div className="gap-40"></div>
                <div className="subTitle">과제 대상</div>
                <p>
                  If you want to get inspiration or just show something directly to your clients,
                  you can jump-start your development with our pre-built example pages.
                  You will be able to quickly set up the basic structure for your web project.
                  If you want to get inspiration or just show something directly to your clients,
                  you can jump-start your development with our pre-built example pages.
                  You will be able to quickly set up the basic structure for your web project.
                  If you want to get inspiration or just show something directly to your clients,
                  you can jump-start your development with our pre-built example pages.
                  You will be able to quickly set up the basic structure for your web project.
                </p>


                <div className="gap-40"></div>
                <div className="subTitle">기대 효과</div>
                <p>
                  During the development of this dashboard, we have used many existing resources from awesome developers. We want to thank them for providing their tools open source:
                  MUI - The React UI library for faster and easier web development.
                  React ChartJS 2 - Simple yet flexible React charting for designers & developers.
                  ChromaJS - A small-ish zero-dependency JavaScript library for all kinds of color conversions and color scales.
                  Nepcha Analytics for the analytics tool. Nepcha is already integrated with this template. You can use it to gain insights into your sources of traffic.
                </p>

              </div>
            </div>

            <div className="rightSide">
              <div className="devDesc">
                <div className="developer">
                  <img src={process.env.PUBLIC_URL + "/image/developer/" + findItem.n_id + ".jpg"}
                    className="devImg" alt="devImg" />
                  <div>
                    <span style={{ color: '#585858' }}>{findItem.headquarters} </span>
                    <span style={{ color: '#1CA8DB' }}>{findItem.team} </span>
                    <div className="devNm">{findItem.developer}</div>
                  </div>
                </div>

                <hr />

                <div className="lang">
                  <div className="left">
                    <img src={process.env.PUBLIC_URL + "/image/lang_icons/python.png"} className="langIcon" alt="lang1" />
                    <p>python</p>
                  </div>
                  <div className="right">
                    <img src={process.env.PUBLIC_URL + "/image/lang_icons/django.png"} className="langIcon" alt="lang2" />
                    <p>django</p>
                  </div>
                </div>

                <div className="langDesc">
                  <table>
                    <tbody>
                      <tr>
                        <td>Version</td>
                        <td>1.0.2</td>
                      </tr>
                      <tr>
                        <td>Updated</td>
                        <td>2023.08.21</td>
                      </tr>
                      <tr>
                        <td>Released</td>
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