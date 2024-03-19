import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { BsFloppy2Fill } from 'react-icons/bs';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';


export const ProductUpdate = ({ solutionData, productId }) => {

  const [direc, setDirec] = useState(solutionData.direc);
  const [target, setTarget] = useState(solutionData.target);
  const [effect, setEffect] = useState(solutionData.effect);
  const navigate = useNavigate();

  // Warning 잡는 로직 인데, 안잡힘 : Listener added for a synchronous 'DOMNodeInserted' DOM Mutation Event.
  const quillRef = useRef(null);
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      console.log('ReactQuill 내부 DOM 변화 감지됨', mutations);
    });
    const config = {
      childList: true,
      subtree: true,
    };
    const editor = quillRef.current ? quillRef.current.getEditor().root : null;
    if (editor) {
      observer.observe(editor, config);
    }
    return () => observer.disconnect();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/solutions/update/${productId}`, {
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

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'color': ['black', 'gray', 'red', 'green', 'blue', 'orange', 'violet', '#d0d1d2'] }, { 'background': [] }],
      [{ 'align': [] }],
    ]
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
                    <ReactQuill ref={quillRef} className="editor" theme="snow" modules={modules} value={direc} onChange={setDirec} />
                  </div>

                  <div className="gap-20"></div>
                  <div className="subTitle">과제 대상</div>
                  <div className="editorContainer">
                    <ReactQuill ref={quillRef} className="editor" theme="snow" modules={modules} value={target} onChange={setTarget} />
                  </div>

                  <div className="gap-20"></div>
                  <div className="subTitle">기대 효과</div>
                  <div className="editorContainer">
                    <ReactQuill ref={quillRef} className="editor" theme="snow" modules={modules} value={effect} onChange={setEffect} />
                  </div>

                </div>
                <div className="gap-20"></div>
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
                        <td>최근 업데이트</td>
                        <td>2023.08.21</td>
                      </tr>
                      <tr>
                        <td>개발 일자</td>
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