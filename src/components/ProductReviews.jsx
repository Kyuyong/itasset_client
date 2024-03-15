import React, { useContext, useState } from 'react'
import { AuthContext } from "../context/authContext";
import Stack from '@mui/material/Stack';
import { pink } from '@mui/material/colors';
import { Button, IconButton, Rating, TextField } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { BsPenFill, BsTrashFill } from 'react-icons/bs';
import { v4 as uuidv4 } from 'uuid'
import { format } from 'date-fns';
import { useLocation } from 'react-router-dom';

export const ProductReviews = () => {

  const { currentUser } = useContext(AuthContext);
  const [comments, setComments] = useState([]); // 댓글 데이터 상태
  const [commentInput, setCommentInput] = useState(''); // 입력된 댓글 내용

  // Product ID 기준 불러오기
  const location = useLocation(); // useLocation 훅을 사용해 location 객체 얻기
  const sol_id = location.pathname.split("/")[2];

  const [likeCount, setLikeCount] = useState(0);


  const handleLike = () => {
    setLikeCount(likeCount + 1);
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    const newComment = {
      uuid: uuidv4(),
      n_id: currentUser.userId,
      n_name: currentUser.name,
      team: currentUser.deptName,
      headqt: currentUser.prntDeptName,
      content: commentInput,
      date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      sol_id
    };

    try {
      const response = await fetch("/api/reviews/reviewreg", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newComment),
      });

      if (response.ok) {
        const data = await response.json();
        // 서버에서 반환된 댓글 데이터로 댓글 목록 업데이트
        setComments((prevComments) => [...prevComments, data]);
        setCommentInput('');
      } else {
        // 서버 에러 처리
        throw new Error('댓글을 저장하는데 실패했습니다.');
      }
    } catch (error) {
      // 에러 처리
      console.error('댓글 추가 에러:', error);
    }
  };

  // const handleAddComment = (e) => {
  //   e.preventDefault();
  //   if (!commentInput.trim()) return;

  //   const newComment = {
  //     uuid: uuidv4(), // id -> uuid
  //     n_id: currentUser.userId, // userId -> n_id
  //     n_name: currentUser.name, // name -> n_name
  //     team: currentUser.deptName, // deptName -> team
  //     headqt: currentUser.prntDeptName, // prntDeptName -> headqt
  //     content: commentInput,
  //     date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
  //     sol_id
  //   };

  //   setComments([...comments, newComment]);
  //   setCommentInput('');
  // };

  console.log(comments);
  console.log("product id;", sol_id);

  return (
    <div className="productReviews">
      <div className="contentBox">
        <div className="container">
          <div className="gap-20"></div>
          <div className="titleText">Reviews 보기</div>

          <form className="commentForm" onSubmit={handleAddComment}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="댓글을 입력하세요."
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
            />
            <Button className="commentBtn" type="submit" variant="contained" color="primary">
              댓글 달기
            </Button>
          </form>
          {
            [...comments].sort((a, b) => new Date(b.date) - new Date(a.date)).map((comment) => (
              <div key={comment.uuid}>
                <div className="reviewBox">
                  <div className="reviewHeader">
                    <div>
                      <p className="reviewNm">{comment.n_name} </p>
                      <p className="reviewTeam">{comment.team}</p>
                    </div>
                    <p className="reviewDate">{comment.date}</p>
                  </div>
                  <div className="reviewContent">
                    {comment.content}
                  </div>
                  <div className="reviewActions">
                    <Button className="reviewActionsBtn"> <BsTrashFill />삭제하기</Button>
                    <Button className="reviewActionsBtn"> <BsPenFill />수정하기</Button>
                  </div>
                </div>
              </div>
            ))}

          <div className="gap-30"></div>
          <div className="scored">
            <Stack direction="row" spacing={2} divider={<div style={{ margin: '0 auto' }} />} alignItems="center">
              <div className="scoreBox">
                <p>현장 활용도</p>
                <Rating name="half-rating-read" defaultValue={4.5} precision={0.5} readOnly />
              </div>
              <div className="scoreBox">
                <p>데이터 정확도</p>
                <Rating name="half-rating-read" defaultValue={3.5} precision={0.5} readOnly />
              </div>
              <div className="scoreBox">
                <p>Solution Quality</p>
                <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
              </div>
              <div className="scoreBox">
                <p>업무 효율성</p>
                <Rating name="half-rating-read" defaultValue={5} precision={0.5} readOnly />
              </div>
              <div className="scoreBox">
                <Button variant="outlined" className="likeBtn">
                  마음에 들면 좋아요
                  <IconButton onClick={handleLike} sx={{ color: pink[500] }}>
                    <FavoriteIcon />
                  </IconButton>
                  <p>{likeCount} </p>
                </Button>
              </div>
            </Stack>
          </div>

          <div className="gap-60"></div>
        </div>
      </div>
      <div className="gap-60"></div>
    </div>
  )
}


export default ProductReviews;