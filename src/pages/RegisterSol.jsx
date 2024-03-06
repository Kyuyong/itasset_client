

import { Button, Container, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
// import moment from "moment";

export const RegisterSol = ({ onSubmit }) => {
  const [solution, setSolution] = useState({
    sol_name: '',
    sol_full_name: '',
    kor_name: '',
    n_id: '',
    url: '',
    github_url: '',
    work_field: '',
    date: '',
    likeCnt: '',
    img: ''
  });

  const handleChange = (e) => {
    setSolution({ ...solution, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/solutions/register', solution);
      if (response.status >= 200 && response.status < 300) {
        alert('솔루션 등록 성공');
        if (typeof onSubmit === 'function') {
          onSubmit(true, solution);
        }
      } else {
        alert('솔루션 등록 실패');
        if (typeof onSubmit === 'function') {
          onSubmit(false, solution);
        }
      }
    }
    catch (error) {
      let errorMessage = '솔루션 등록 실패';
      if (error.response && error.response.status === 409) {
        errorMessage = error.response.data;
      } else {
        errorMessage = `솔루션 등록 실패: ${error.message}`;
      }
      alert(errorMessage);
      console.error('솔루션 등록 중 에러 발생', error);
    }
    // setSolution({
    //   sol_name: '',
    //   sol_full_name: '',
    //   kor_name: '',
    //   n_id: '',
    //   url: '',
    //   github_url: '',
    //   work_field: '',
    //   date: '',
    //   likeCnt: '',
    //   img: '',
    // });
  };





  return (
    <div className="registerSol">
      <div className="box">
        <div className="bg" />
      </div>
      <div className="gap-60" />


      <Container component="main" maxWidth="xs">
        <Typography component="h1" variant="h5">Solution 등록</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="sol_name"
            label="Solution Name"
            type="text"
            id="sol_name"
            autoComplete="sol_name"
            value={solution.sol_name}
            onChange={handleChange}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="sol_full_name"
            label="Solution Full Name"
            type="text"
            id="sol_full_name"
            autoComplete="sol_full_name"
            value={solution.sol_full_name}
            onChange={handleChange}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="kor_name"
            label="한글 명칭"
            type="text"
            id="kor_name"
            autoComplete="kor_name"
            value={solution.kor_name}
            onChange={handleChange}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="n_id"
            label="개발자 사번"
            type="text"
            id="n_id"
            autoComplete="n_id"
            value={solution.n_id}
            onChange={handleChange}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="url"
            label="시스템 바로가기 Link"
            type="text"
            id="url"
            autoComplete="url"
            value={solution.url}
            onChange={handleChange}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="github_url"
            label="Github 바로가기 Link"
            type="text"
            id="github_url"
            autoComplete="github_url"
            value={solution.github_url}
            onChange={handleChange}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="work_field"
            label="적용 업무 직군"
            type="text"
            id="work_field"
            autoComplete="work_field"
            value={solution.work_field}
            onChange={handleChange}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="date"
            label="등록 일자 (YYYY-MM-DD)"
            type="text"
            id="date"
            autoComplete="date"
            value={solution.date}
            onChange={handleChange}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="likeCnt"
            label="좋아요 수"
            type="text"
            id="likeCnt"
            autoComplete="likeCnt"
            value={solution.likeCnt}
            onChange={handleChange}
          />


          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="img"
            label="Solution Image"
            type="text"
            id="img"
            autoComplete="img"
            value={solution.img}
            onChange={handleChange}
          />




          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            등록
          </Button>
        </form>
        <div className="gap-60" />
      </Container>
    </div>
  )
}


export default RegisterSol;
