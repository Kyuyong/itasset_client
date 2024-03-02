import { Button, Container, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';

export const RegisterSol = ({ onSubmit }) => {
  const [solution, setSolution] = useState({
    sol_name: '',
    kor_name: '',
    n_id: '',
  });
  const handleChange = (e) => {
    setSolution({ ...solution, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/solutions/register', solution);
      if (response.status >= 200 && response.status < 300) {
        // 성공 처리 로직
        alert('솔루션 등록 성공');
        onSubmit(true, solution);
      } else {
        // 실패 처리 로직
        alert('솔루션 등록 실패');
        onSubmit(false, solution);
      }
    } catch (error) {
      alert(`솔루션 등록 실패: ${error.message}`);
      console.error('솔루션 등록 중 에러 발생', error);
    }
    setSolution({
      sol_name: '',
      kor_name: '',
      n_id: '',
    });
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
            name="kor_name"
            label="한국어 Solution 이름"
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