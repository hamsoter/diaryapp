import React from 'react';

import { Box } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MyLibrary from './pages/MyLibrary';
import Diary from './pages/Diary';
import '../src/components/UI/App.css';
import ThisDay from './pages/ThisDay';

function App() {
  let diariesArr = [];
  const setTempDiariesHandler = diaries => {
    console.log(diaries);
    diariesArr = diaries;
  };

  const getTempDiaresHandler = () => {
    return diariesArr;
  };

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
            element={<Diary getTempDiaries={getTempDiaresHandler} />}
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
                setTempDiaries={setTempDiariesHandler}
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
            element={<Diary getTempDiaries={getTempDiaresHandler} />}
          />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
