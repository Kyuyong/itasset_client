import React, { useState } from 'react';
import axios from 'axios';
import moment from "moment";
import { toast } from 'react-toastify';

export const FileUpload = () => {
  const [file, setFile] = useState(null);

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      return res.data;

    } catch (err) {
      console.log(err);
      toast.error("파일 업로드 중 오류가 발생했습니다.");
    }
  };



  const handleClick = async e => {
    e.preventDefault();
    const imgUrl = await upload();
    console.log(imgUrl);
    try {
      await axios.post('/solutions/upload', {
        imgUrl: imgUrl, // 업로드된 이미지의 URL
        date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      });
      toast.success("게시글이 성공적으로 등록되었습니다.");
    } catch (err) {
      console.log(err)
    }
  }


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
