import React from 'react';
import './components/UI/App.css';

import { Box } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MyLibrary from './components/DiaryLists/MyLibrary';

function App() {
  return (
    <Box>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MyLibrary />}></Route>
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
