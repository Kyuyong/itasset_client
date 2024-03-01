import React, { useState } from 'react'

import Stack from '@mui/material/Stack';
import { pink } from '@mui/material/colors';
import { Button, IconButton, Rating } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { BsPenFill, BsTrashFill } from 'react-icons/bs';


export const ProductReviews = () => {

  const [likeCount, setLikeCount] = useState(0);

  const handleLike = () => {
    setLikeCount(likeCount + 1); // 버튼 클릭 시 좋아요 수 증가
  };
  return (
    <div className="productReviews">
      <div className="contentBox">
        <div className="container">
          <div className="gap-40"></div>
          <div className="titleText">Reviews 보기</div>
          <div className="gap-20"></div>
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

          <div className="gap-20"></div>

          <div className="reviewBox">
            <div className="reviewHeader">
              <div>
                <p className="reviewNm">강세운</p>
                <p className="reviewTeam">평택품질개선팀</p>
              </div>
              <p className="reviewDate">2024.02.07</p>
            </div>
            <p className="reviewContent">
              Each element is well presented in very complex documentation.
              You can read more about the documentation here.
              If you want to get inspiration or just show something directly to your clients,
              you can jump-start your development with our pre-built example pages.
              You will be able to quickly set up the basic structure for your web project.
              Each element is well presented in very complex documentation.
              You can read more about the documentation here.
              Each element is well presented in very complex documentation.
              You can read more about the documentation here.
            </p>
            <div className="reviewActions">
              <button className="reviewActionsBtn"> <BsTrashFill />삭제하기</button>
              <button className="reviewActionsBtn"> <BsPenFill />수정하기</button>
            </div>
          </div>

          <div className="reviewBox">
            <div className="reviewHeader">
              <div>
                <p className="reviewNm">도혜경</p>
                <p className="reviewTeam">재무관리팀</p>
              </div>
              <p className="reviewDate">2024.02.07</p>
            </div>
            <p className="reviewContent">
              이 시스템 정말 잘 만든것 같습니다. 현장에서 쓰기 너무 좋습니다.
            </p>
            <div className="reviewActions">
              <button className="reviewActionsBtn"> <BsTrashFill />삭제하기</button>
              <button className="reviewActionsBtn"> <BsPenFill />수정하기</button>
            </div>
          </div>

          <div className="reviewBox">
            <div className="reviewHeader">
              <div>
                <p className="reviewNm">정승근</p>
                <p className="reviewTeam">강북품질개선팀</p>
              </div>
              <p className="reviewDate">2024.02.07</p>
            </div>
            <p className="reviewContent">
              Each element is well presented in very complex documentation.
              You can read more about the documentation here.
              If you want to get inspiration or just show something directly to your clients,
              you can jump-start your development with our pre-built example pages.
              You will be able to quickly set up the basic structure for your web project.
              Each element is well presented in very complex documentation.
              You can read more about the documentation here.
              Each element is well presented in very complex documentation.
              You can read more about the documentation here.
              Each element is well presented in very complex documentation.
              You can read more about the documentation here.
              If you want to get inspiration or just show something directly to your clients,
              you can jump-start your development with our pre-built example pages.
              You will be able to quickly set up the basic structure for your web project.
              Each element is well presented in very complex documentation.
              You can read more about the documentation here.
              Each element is well presented in very complex documentation.
              You can read more about the documentation here.
            </p>
            <div className="reviewActions">
              <button className="reviewActionsBtn"> <BsTrashFill />삭제하기</button>
              <button className="reviewActionsBtn"> <BsPenFill />수정하기</button>
            </div>
          </div>

          <div className="gap-30"></div>
          <form className="commentForm">
            <textarea className="commentInput" placeholder="댓글을 입력하세요."></textarea>
            <div className="buttonContainer">
              <button type="submit" className="submitBtn">댓글 달기</button>
            </div>
          </form>
          <div className="gap-60"></div>
        </div>
      </div>
      <div className="gap-60"></div>
    </div>
  )
}


export default ProductReviews;