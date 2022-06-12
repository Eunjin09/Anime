import React from "react";
import './App.css';

import { Route, Routes, useNavigate } from 'react-router-dom'

// 리덕스 관련 Imports
import { useDispatch, useSelector } from 'react-redux'

// CSS 관련 Imports
import styled from 'styled-components'

// 컴포넌트 Imports
import AnimeList from "./components/AnimeList";
import Write from "./components/Write";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Detail from "./components/Detail";

// 연결 예정
import Header_home from "./components/Header_home";
import Header_nav from "./components/Header_nav";



function App() {
  return (
    <div className="App">
      {/* if문 사용해서 Header_home, Header_nav 보여주기 */}
      <Header_nav />
      <Routes>
        <Route path='/' element={<AnimeList />} />
        <Route path='/write/:post_id' element={<Write />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/detail/:id' element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
