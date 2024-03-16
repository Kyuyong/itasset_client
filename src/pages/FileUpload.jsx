import React, { useState } from 'react';
import axios from 'axios';
import moment from "moment";


export const FileUpload = () => {
  const [file, setFile] = useState(null);



  // const upload = async () => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("file", file);
  //     const res = await axios.post("/api/upload", formData);
  //     return res.data;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file); // 파일 추가
      console.log("업로드 시도: ", file); // 업로드 시도하는 파일 로그

      // FormData의 내용을 로깅
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      const res = await axios.post("/api/upload", formData, {
        headers: {
          'Content-Type': 'multipart/form-data' // 필요한 경우 명시적으로 세팅
        }
      });
      console.log("업로드 성공: ", res.data); // 응답 로그
      return res.data;
    } catch (err) {
      console.error("업로드 실패: ", err);
    }
  };



  const handleClick = async e => {
    e.preventDefault();
    const imgURL = await upload(); // 업로드된 파일의 경로만을 받음
    const date = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");

    if (imgURL) { // filePath가 정상적으로 반환된 경우에만 실행
      try {
        await axios.post('/api/solutions/fileupload', {
          filePath: imgURL.filePath, // filePath 전송
          date,
        });
        console.log("전송된 filePath:", imgURL);
        console.log("전송된 date:", date);
      } catch (err) {
        console.error("데이터 전송 실패:", err);
      }
    } else {
      console.error("파일 업로드 실패");
    }
  };


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="registerSol">
      <div className="box">
        <div className="bg" />
      </div>
      <div className="gap-100"></div>
      <div style={{ width: '300px', marginLeft: '500px' }}>
        <h1>Upload</h1>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleClick}>Upload</button>
      </div>

      <div className="gap-100"></div>
    </div>
  );
};

export default FileUpload;
