import React from 'react';

import { Box } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MyLibrary from './pages/MyLibrary';
import Diary from './pages/Diary';

function App() {
  let diariesArr = [
    // 임시데이터
    {
      id: 'hhlgzm',
      userName: '냐무',
      title: '나의 일상',
      color: {
        label: 'orange',
        mainColor: '#FF6900',
        subColor: '#ad4700',
        trextColor: 'white',
      },
      lastRecord: '2022-03-22T09:07:54.310Z',
    },
  ];
  const setTempDiariesHandler = diaries => {
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
            element={<MyLibrary setTempDiaries={setTempDiariesHandler} />}
          />
          <Route
            path="/diary/:uuid"
            element={<Diary getTempDiaries={getTempDiaresHandler} />}
          />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
