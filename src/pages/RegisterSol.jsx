

import { Button, Container, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
// import moment from "moment";

import solutions from "../json/solutiondata.json"

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
    // img: '' 
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setSolution({ ...solution, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

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


  const handleSubmit = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();

    // 업로드된 이미지 URL을 solution 객체에 추가
    const solutionData = { ...solution, imgUrl };


    // try에서 solution --> solutionData로 변경함 
    try {
      const response = await axios.post('/solutions/register', solutionData);
      if (response.status >= 200 && response.status < 300) {
        alert('솔루션 등록 성공');
        if (typeof onSubmit === 'function') {
          onSubmit(true, solutionData);
        }
      } else {
        alert('솔루션 등록 실패');
        if (typeof onSubmit === 'function') {
          onSubmit(false, solutionData);
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
    setSolution({
      sol_name: '',
      sol_full_name: '',
      kor_name: '',
      n_id: '',
      url: '',
      github_url: '',
      work_field: '',
      date: '',
      likeCnt: '',
      // img: '',
    });
  };





  return (
    <div className="registerSol">
      <div className="box">
        <div className="bg" />
      </div>
      <div className="gap-60" />


      <Container component="main" maxWidth="xl">
        <Typography component="h1" variant="h5">Solution 등록</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                variant="outlined" margin="normal" required fullWidth name="sol_name"
                label="Solution Name" type="text" id="sol_name" autoComplete="sol_name"
                value={solution.sol_name} onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="outlined" margin="normal" fullWidth name="sol_full_name"
                label="Solution Full Name" type="text" id="sol_full_name" autoComplete="sol_full_name"
                value={solution.sol_full_name} onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="outlined" margin="normal" fullWidth name="kor_name"
                label="한글 명칭" type="text" id="kor_name" autoComplete="kor_name"
                value={solution.kor_name} onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="outlined" margin="normal" required fullWidth name="n_id"
                label="개발자 사번" type="text" id="n_id" autoComplete="n_id"
                value={solution.n_id} onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="outlined" margin="normal" fullWidth name="url"
                label="시스템 바로가기 Link" type="text" id="url" autoComplete="url"
                value={solution.url} onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="outlined" margin="normal" fullWidth name="github_url"
                label="Github 바로가기 Link" type="text" id="github_url" autoComplete="github_url"
                value={solution.github_url} onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="outlined" margin="normal" fullWidth name="work_field"
                label="업무 직군" type="text" id="work_field" autoComplete="work_field"
                value={solution.work_field} onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="outlined" margin="normal" fullWidth name="date"
                label="개발 일자 (YYYY-MM-DD)" type="text" id="date" autoComplete="date"
                value={solution.date} onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="outlined" margin="normal" fullWidth name="likeCnt"
                label="좋아요 수" type="text" id="likeCnt" autoComplete="likeCnt"
                value={solution.likeCnt} onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined" margin="normal" fullWidth name="img"
                type="file" id="img" autoComplete="img" onChange={handleFileChange}
              />
              {/* <input type="file" onChange={handleFileChange} /> */}
            </Grid>
          </Grid>

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


      <Container component="main" maxWidth="xl">
        <Typography component="h1" variant="h4">Solution List</Typography>
        <Paper className="paper">
          <Table className="table">
            <TableHead className="tableHead">
              <TableRow>
                <TableCell className="tableCell">ID</TableCell>
                <TableCell className="tableCell">Solution Name</TableCell>
                <TableCell className="tableCell">Solution Full Name</TableCell>
                <TableCell className="tableCell">한글 명칭</TableCell>
                <TableCell className="tableCell">개발자 사번</TableCell>
                <TableCell className="tableCell">Link</TableCell>
                <TableCell className="tableCell">Github Link</TableCell>
                <TableCell className="tableCell">업무 직군</TableCell>
                <TableCell className="tableCell">개발 일자</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {solutions.map((sol) => (
                <TableRow key={sol.id}>
                  <TableCell className="tableCell">{sol.id}</TableCell>
                  <TableCell className="tableCell">{sol.sol_name}</TableCell>
                  <TableCell className="tableCell">{sol.sol_full_name}</TableCell>
                  <TableCell className="tableCell">{sol.kor_name}</TableCell>
                  <TableCell className="tableCell">{sol.n_id}</TableCell>
                  <TableCell className="tableCell">{sol.url}</TableCell>
                  <TableCell className="tableCell">{sol.github_url}</TableCell>
                  <TableCell className="tableCell">{sol.work_field}</TableCell>
                  <TableCell className="tableCell">{sol.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Container>

      <div className="gap-100"></div>

    </div>
  )
}


export default RegisterSol;
