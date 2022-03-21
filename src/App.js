import React from 'react';

import { Box } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MyLibrary from './pages/MyLibrary';
import Diary from './pages/Diary';

function App() {
  let diariesArr = [];
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
