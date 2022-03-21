import React from 'react';

import { Box } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MyLibrary from './pages/MyLibrary';
import Diary from './pages/Diary';

function App() {
  return (
    <Box>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MyLibrary />} />
          <Route path="/diary/:uuiddesu" element={<Diary />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
