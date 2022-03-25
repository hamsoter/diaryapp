import React from 'react';

import { Box } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MyLibrary from './pages/MyLibrary';
import Diary from './pages/Diary';
import '../src/components/UI/App.css';

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
        // 추가됨
        normal50: '#FFFAF0',
        normal100: '#FEEBC8',
        normal300: '#F6AD55',
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
