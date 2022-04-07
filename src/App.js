import React, { useState } from 'react';

import { Box } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MyLibrary from './pages/MyLibrary';
import Diary from './pages/Diary';
import '../src/components/UI/App.css';
import ThisDay from './pages/ThisDay';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  let diariesArr = [];
  const setTempDiariesHandler = diaries => {
    console.log(diaries);
    diariesArr = diaries;
  };

  const getTempDiaresHandler = () => {
    return diariesArr;
  };

  // 일기장 존재 여부를 저장할 공간
  const [notFoundFlag, setNotFoundFlag] = useState('false');

  // 길 잃은 횟수 카운트
  const [missingCount, setMissingCount] = useState(1);

  return (
    <Box>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <MyLibrary
                getTempDiaries={getTempDiaresHandler}
                setTempDiaries={setTempDiariesHandler}
              />
            }
          />
          <Route
            path="/diary/:uuid"
            element={
              <Diary
                getTempDiaries={getTempDiaresHandler}
                notFoundFlag={notFoundFlag}
                setNotFoundFlag={setNotFoundFlag}
                missingCount={missingCount}
                setMissingCount={setMissingCount}
              />
            }
          />
          {/* <Route
            path="/diary/:uuid/:dayid/write"
            element={
              <ThisDay
                getTempDiaries={getTempDiaresHandler}
                setTempDiaries={setTempDiariesHandler}
                mode={'write'}
              />
            }
          /> */}
          <Route
            path="/diary/:uuid/write"
            element={
              <ThisDay
                getTempDiaries={getTempDiaresHandler}
                notFoundFlag={notFoundFlag}
                setNotFoundFlag={setNotFoundFlag}
                missingCount={missingCount}
                setMissingCount={setMissingCount}
                mode={'write'}
              />
            }
          />
          <Route
            path="/diary/:uuid/:dayid/read"
            element={
              <ThisDay
                getTempDiaries={getTempDiaresHandler}
                setTempDiaries={setTempDiariesHandler}
                setMissingCount={setMissingCount}
                mode={'read'}
              />
            }
          />

          <Route
            path="/diary/:uuid/:dayid/update"
            element={
              <ThisDay
                getTempDiaries={getTempDiaresHandler}
                setTempDiaries={setTempDiariesHandler}
                mode={'update'}
              />
            }
          />
          <Route
            path="/*"
            element={<NotFoundPage missingCount={missingCount} />}
          />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
