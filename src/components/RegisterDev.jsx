import { Button, Container, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ListAltIcon from '@mui/icons-material/ListAlt';
import axios from 'axios';
import UserSearch from './UserSearch';

export const RegisterDev = () => {

  const [developerInfo, setDeveloperInfo] = useState({
    n_id: '',
    introduction: '',
  });
  const [file, setFile] = useState(null);
  const [getDevelopers, setGetDevelopers] = useState([]);
  const handleInputChange = (e) => {
    setDeveloperInfo({ ...developerInfo, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file); // 파일 추가
      console.log("업로드 시도: ", file); // 업로드 시도하는 파일 로그
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
      const res = await axios.post("/api/upload/developers", formData, {
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

  const handleAddDeveloper = async (e) => {
    e.preventDefault();
    const dev_img = (await upload()).filePath;
    const developerData = { ...developerInfo, dev_img };
    try {
      const response = await axios.post("/api/developers/registerdev", developerData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        console.log("서버로부터 받은 데이터:", response.data);
        const data = await response.json();
        setGetDevelopers((prevDevelopers) => [...prevDevelopers, data]);
        setDeveloperInfo('');
      } else {
        throw new Error('개발자 등록에 실패했습니다.');
      }
    } catch (error) {
      let errorMessage = '개발자 등록 실패';
      if (error.response && error.response.status === 409) {
        errorMessage = error.response.data;
      } else {
        errorMessage = `솔루션 등록 실패: ${error.message}`;
      }
      alert(errorMessage);
      console.error('솔루션 등록 중 에러 발생', error);
    }
    setDeveloperInfo({
      n_id: '',
      introduction: ''
    })
  };

  const fetchDevelopers = async () => {
    try {
      const response = await axios.get("/api/developers/getdeveloper");
      setGetDevelopers(response.data);
    } catch (error) {
      console.log("개발자 가져올때 오류가 발생했습니다.", error);
    };
  };
  useEffect(() => {
    fetchDevelopers();
  }, []);

  return (
    <div className="registerDev">
      <div className="gap-40"></div>

      <Container maxWidth="xl">
        <Grid container spacing={2}>
          {/* Admin 계정 등록 섹션 */}
          <Grid item xs={12} md={6}>
            <Typography component="h1" variant="h5" className="title" style={{ marginBottom: '20px' }}>
              <AssignmentIndIcon />개발자 등록
            </Typography>
            <form onSubmit={handleAddDeveloper}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined" margin="none" required fullWidth name="n_id"
                    label="N사번" type="text" id="n_id" autoComplete="n_id"
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined" margin="none" fullWidth name="dev_img"
                    type="file" id="dev_img" autoComplete="dev_img"

                    onChange={handleFileChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined" margin="none" fullWidth name="introduction"
                    label="개발자 소개글" type="text" id="introduction" autoComplete="introduction"
                    multiline rows={6}
                    onChange={handleInputChange}
                  />
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
          </Grid>

          {/* Admin 계정 리스트 섹션 */}
          <Grid item xs={12} md={6}>
            <UserSearch />
          </Grid>

        </Grid>
      </Container>

      {/* <Container main="main" maxWidth="xl">
        <Typography component="h1" variant="h5" className="title" style={{ marginBottom: '15px' }}>
          <AssignmentIndIcon />개발자 등록
        </Typography>

        <form onSubmit={handleAddDeveloper}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                variant="outlined" margin="none" required fullWidth name="n_id"
                label="N사번" type="text" id="n_id" autoComplete="n_id"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined" margin="none" fullWidth name="dev_img"
                type="file" id="dev_img" autoComplete="dev_img"

                onChange={handleFileChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined" margin="none" fullWidth name="introduction"
                label="개발자 소개글" type="text" id="introduction" autoComplete="introduction"
                multiline rows={6}
                onChange={handleInputChange}
              />
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
      </Container>

      <hr style={{ margin: '0 auto', width: '93%', marginTop: '20px' }} />

      <UserSearch /> */}
      <hr style={{ margin: '0 auto', width: '93%', marginTop: '20px' }} />

      <Container component="main" maxWidth="xl">
        <Grid container alignItems="center" justifyContent="space-between" spacing={2} sx={{ mt: 3, mb: 2 }}>
          <Grid item xs>
            <Typography component="h1" variant="h5" className="title" >
              <ListAltIcon />
              개발자 등록 List
            </Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={fetchDevelopers}>
              새로고침
            </Button>
          </Grid>
        </Grid>

        <Paper className="paper">
          <Table className="table">
            <TableHead className="tableHead">
              <TableRow>
                <TableCell className="tableCell">ID</TableCell>
                <TableCell className="tableCell">사번</TableCell>
                <TableCell className="tableCell">이미지 경로</TableCell>
                <TableCell className="tableCell">개발자 소개글</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {getDevelopers.map((developer, index) => (
                <TableRow key={index}>
                  <TableCell>{developer.id}</TableCell>
                  <TableCell>{developer.n_id}</TableCell>
                  <TableCell>
                    {developer.dev_img}
                  </TableCell>
                  <TableCell>{developer.introduction}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

        </Paper>

      </Container>
      <div className="gap-60"></div>
    </div>
  )
}

export default RegisterDev;