import React, { useRef, useState, useEffect } from "react";
import axios from 'axios'

import { useNavigate, useParams } from 'react-router-dom'

// 리덕스 관련 Imports
import { useDispatch, useSelector } from 'react-redux'
import { create_post_AX } from '../redux/modules/posts'

// CSS 관련 Imports
import styled from 'styled-components'
import { BsYoutube } from 'react-icons/bs'


function Write() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const params = useParams()

  // 게시물 수정인지, 새로 쓰는것인지 판별합니다 :)
  const isNew = params.post_id === 'new' ? true : false


  // 새로 쓰는 데이터라면 : 현재 포스트의 데이터를 불러오고, 로딩 완료여부를 체크합니다.
  const [thisPost, setThisPost] = React.useState(null)
  const [isLoaded, setIsLoaded] = React.useState(false)

  React.useEffect(() => {
    if (!isNew) {
      axios.get('http://localhost:5001/posts?id=' + params.post_id)
        .then(response => setThisPost(...response.data))
        .then(setIsLoaded(true))
    }
    console.log(thisPost)
  }, [])

  // 입력창 정보 받아오기
  const title_ref = useRef(null);
  const onair_year_ref = useRef(null);
  const thumbnail_ref = useRef(null);
  const ost_url_ref = useRef(null);
  const content_ref = useRef(null);

  // 작성하기 버튼 눌렀을때 :)
  const writePost = () => {
    const new_post = {
      title: title_ref.current.value,
      thumbnail_url: "https://movie-phinf.pstatic.net/20160314_26/1457920153891qdBTB_JPEG/movie_image.jpg",
      onair_year: onair_year_ref.current.value,
      content: content_ref.current.value,
      ost_url: ost_url_ref.current.value,
      user_id: "user123",
    }
    dispatch(create_post_AX(new_post))
  }

  return (
    <FormWrap>
      <button onClick={() => navigate('/')}>임시버튼 : 리스트 가기</button>

      <label>만화제목
        <input type='text' ref={title_ref} placeholder="추억 속 만화 제목을 적어주세요"
          defaultValue={isLoaded ? '로딩됐어' : '아직아니야'} /></label>

      <label>방영연도
        <input type='number' ref={onair_year_ref}
          defaultValue='2000' /></label>

      <label>만화이미지
        <input type='file' id="post_thumb" ref={thumbnail_ref}
          defaultValue='' /></label> <ImgPreview htmlFor="post_thumb" />

      <label>만화 OST
        <input type='url' ref={ost_url_ref}
          defaultValue='' placeholder="추억의 주제가 링크를 넣어주시겠어요? (필수 x)" /></label>

      <YoutubeBtn target='blank' href="https://www.youtube.com/">
        <YoutubeIcon>
          <BsYoutube />
        </YoutubeIcon>  유튜브 <br /> 바로가기
      </YoutubeBtn>

      <label>만화소개</label> <textarea ref={content_ref} placeholder="당신의 추억 속 이 만화는 어떤 만화였나요?"
        defaultValue='' />

      <button onClick={writePost}> 등록하기 </button>

    </FormWrap>
  );
}

const FormWrap = styled.div`
  margin: 120px auto;
  display:flex;
  flex-direction: column;
  width: 60%;
  gap: 20px;

  input {
    height: 30px;
    width: 400px;
  }
`
const ImgPreview = styled.label`
background: #ddd;
background-size: cover;
height: 80px;
width: 60px;
`

const YoutubeBtn = styled.a`
  display:flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  text-decoration: none;
  border: 1px solid #000;
  border-radius: 10px;
  margin-left: 70px;
  width: 140px;
  padding : 0px 10px;
  height: 50px;

  &:visited{
    color: #000;
}
`

const YoutubeIcon = styled.span`
  font-size: 50px;
  margin: 0px 20px 0px 0px;
  padding: 0px;
  padding-top: 10px;
  color: red;
`

export default Write;
