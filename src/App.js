import React, { useState } from 'react';

import { Box } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MyLibrary from './pages/MyLibrary';
import Diary from './pages/Diary';
import '../src/components/UI/App.css';
import ThisDay from './pages/ThisDay';
import NotFoundPage from './pages/NotFoundPage';

// firebase
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase } from 'firebase/database';
import { ref, get } from 'firebase/database';

function App() {
  // firebase
  const firebaseConfig = {
    apiKey: 'AIzaSyBnm9uNeNwB7vL642icvI6ftbNOyHqD1Ps',
    authDomain: 'diaryapp-2a3ce.firebaseapp.com',
    databaseURL: 'https://diaryapp-2a3ce-default-rtdb.firebaseio.com',
    projectId: 'diaryapp-2a3ce',
    storageBucket: 'diaryapp-2a3ce.appspot.com',
    messagingSenderId: '313877494384',
    appId: '1:313877494384:web:29c3bcd299bb74704952b5',
    measurementId: 'G-QNQ1GQW7P3',
  };

  const fbApp = initializeApp(firebaseConfig);

  const analytics = getAnalytics(fbApp);

  let diariesArr = [];

  const getDiariesHandler = async () => {
    const data = await get(ref(db, `diaries`));

    const dataArr = Object.values(data.val());
    console.log(dataArr);

    const solved = dataArr.map(item => {
      item.lastRecord = new Date(item.lastRecord);
      item.pages = item.pages ? item.pages : [];

      return item;
    });

    diariesArr = solved;

    console.log('db에서 데이터 불러옴');

    return solved;
  };

  const getDiariesArr = () => diariesArr;

  const getTempDiaresHandler = () => {
    return diariesArr;
  };

  const db = getDatabase(fbApp);

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
            element={<MyLibrary loadDiaries={getDiariesHandler} db={db} />}
          />
          <Route
            path="/diary/:uuid"
            element={
              <Diary
                // getTempDiaries={getTempDiaresHandler}
                db={db}
                getDiariesArr={getDiariesArr}
                loadDiaries={getDiariesHandler}
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
                loadDiaries={getDiariesHandler}
                getDiariesArr={getDiariesArr}
                setMissingCount={setMissingCount}
                mode={'write'}
              />
            }
          />
          <Route
            path="/diary/:uuid/:dayid/read"
            element={
              <ThisDay
                loadDiaries={getDiariesHandler}
                getDiariesArr={getDiariesArr}
                setMissingCount={setMissingCount}
                mode={'read'}
              />
            }
          />

          <Route
            path="/diary/:uuid/:dayid/update"
            element={
              <ThisDay
                loadDiaries={getDiariesHandler}
                getDiariesArr={getDiariesArr}
                setMissingCount={setMissingCount}
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
