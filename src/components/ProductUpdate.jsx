import axios from 'axios';
import React, { useState } from 'react';
import { BsFloppy2Fill } from 'react-icons/bs';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';


export const ProductUpdate = (props) => {
  const solutionData = props.solutionData;
  const [direc, setDirec] = useState(solutionData.direc);
  const [target, setTarget] = useState(solutionData.target);
  const [effect, setEffect] = useState(solutionData.effect);
  const navigate = useNavigate()

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/solutions/update/${solutionData.id}`, {
        direc,
        target,
        effect
      });
      alert("업데이트 성공!");
      navigate("/")
    } catch (error) {
      console.error("업데이트 실패:", error);
      alert("업데이트에 실패했습니다.");
    }
  };

  return (
    <div className="productUpdate">
      <div className="contentBox">
        <div className="container">
          <div className="innerBox">
            <div className="leftSide">
              <div className="gap-60"></div>
              <div className="titleBox">
                <div className="title">Product Edit</div>
              </div>
              <form onSubmit={handleUpdate}>
                <div className="desc">

                  <div className="gap-20"></div>
                  <div className="subTitle">추진 방향</div>
                  <div className="editorContainer">
                    <ReactQuill className="editor" theme="snow" value={direc} onChange={setDirec} />
                  </div>

                  <div className="gap-20"></div>
                  <div className="subTitle">과제 대상</div>
                  <div className="editorContainer">
                    <ReactQuill className="editor" theme="snow" value={target} onChange={setTarget} />
                  </div>

                  <div className="gap-20"></div>
                  <div className="subTitle">기대 효과</div>
                  <div className="editorContainer">
                    <ReactQuill className="editor" theme="snow" value={effect} onChange={setEffect} />
                  </div>

                </div>



                {/* <a
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
                </a> */}


                <button className="updBtn" type="submit">
                  <BsFloppy2Fill /> 내용 업데이트 하기
                </button>
              </form>
            </div>

            <div className="rightSide">
              <div className="devDesc">
                <div className="developer">

                  <img src={process.env.PUBLIC_URL + "/image/developer/person1.png"}
                    className="devImg" alt="devImg" />
                  <div>

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
                    </tbody>
                  </table>
                </div>


              </div>
            </div>
          </div>
        </div>
        <div className="gap-60"></div>
      </div>

      <div className="gap-60"></div>
    </div>
  )
}

export default ProductUpdate;