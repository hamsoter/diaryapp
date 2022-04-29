import React, { useEffect, useState } from 'react';

import { Box, useControllableState } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import MyLibrary from './pages/MyLibrary';
import Diary from './pages/Diary';
import '../src/components/UI/App.css';
import ThisDay from './pages/ThisDay';
import NotFoundPage from './pages/NotFoundPage';

// firebase
import { initializeApp } from '@firebase/app';
import { getAnalytics } from '@firebase/analytics';
import { getDatabase } from '@firebase/database';
import {
  ref,
  get,
  child,
  query,
  orderByChild,
  equalTo,
} from '@firebase/database';
import Login from './pages/Login';
import firebase from 'firebase/compat/app';

import { getAuth } from 'firebase/auth';
import MyPage from './pages/MyPage';
import ReName from './pages/ReName';
import useIsMount from './useIsMount';
import Ghost from './pages/Ghost';
// import Logout from './components/UI/LogoutModal';

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

  firebase.initializeApp(firebaseConfig);

  const fbApp = initializeApp(firebaseConfig);

  const analytics = getAnalytics(fbApp);

  const [loginUser, setLoginUser] = useState();

  useEffect(async () => {
    const auth = getAuth();
    // 로그인 체크 + 로그인유저 세팅
    auth.onAuthStateChanged(async user => {
      if (user) {
        const authUid = user.uid;

        const dbUser = await get(
          query(ref(db, 'users/'), orderByChild('id'), equalTo(authUid))
        );

        // db에 로그인유저의 정보가 있을 시
        if (dbUser.val() !== null) {
          // db의 닉네임으로 유저를 세팅
          setLoginUser({
            id: user.uid,
            name: Object.values(dbUser.val())[0].name,
            email: user.email,
          });
        } else {
          //   '구글로그인이 됐으나 db에 정보가 없음 (이런일이벌어져서ㅏㄴ안됨)'
        }
      }
    });
    return () => {
      setLoginUser(false);
    };
  }, []);

  const getDiariesHandler = async uid => {
    // 로그인한 유저의 일기를 가져오는 쿼리문
    const data = await get(
      query(ref(db, 'diaries'), orderByChild('owner'), equalTo(uid))
    );

    // 작성된 일기가 있을시
    if (data.val() !== null) {
      const dataArr = Object.values(data.val());

      const solved = dataArr
        .map(item => {
          item.lastRecord = new Date(item.lastRecord);
          item.pages = item.pages ? item.pages : []; //

          return item;
        })
        // 날짜순 정렬
        .sort(function (a, b) {
          const aDate = a.lastRecord;
          const bDate = b.lastRecord;

          return new Date(bDate) - new Date(aDate);
        });

      return solved;
    } else {
      // 생성된 일기장이 없을 시, 빈 배열 반환
      return [];
    }
  };

  const db = getDatabase(fbApp);

  // 일기장 존재 여부를 저장할 공간
  const [notFoundFlag, setNotFoundFlag] = useState('false');

  return (
    <Box>
      <link
        rel="stylesheet"
        type="text/css"
        href="http://csshake.surge.sh/csshake-slow.min.css"
      ></link>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <MyLibrary
                loginUser={loginUser}
                loadDiaries={getDiariesHandler}
                db={db}
              />
            }
          />
          <Route
            path="/diary/:uuid"
            element={
              <Diary
                // getTempDiaries={getTempDiaresHandler}
                loginUser={loginUser}
                db={db}
                // getDiariesArr={getDiariesArr}
                // loadDiaries={getDiariesHandler}
                notFoundFlag={notFoundFlag}
                setNotFoundFlag={setNotFoundFlag}
              />
            }
          />
          <Route
            path="/diary/:uuid/write"
            element={<ThisDay db={db} loginUser={loginUser} mode={'write'} />}
          />
          <Route
            path="/diary/:uuid/:dayid/read"
            element={<ThisDay db={db} loginUser={loginUser} mode={'read'} />}
          />
          <Route
            path="/diary/:uuid/:dayid/update"
            element={<ThisDay db={db} loginUser={loginUser} mode={'update'} />}
          />
          <Route
            path="/login"
            element={
              <Login
                config={firebaseConfig}
                fbApp={fbApp}
                db={db}
                setLoginUser={setLoginUser}
              ></Login>
            }
          />
          {/* mypage */}
          <Route
            path="/mypage"
            element={
              <MyPage
                loginUser={loginUser}
                db={db}
                setLoginUser={setLoginUser}
              />
            }
          />
          <Route
            path="/mypage/rename"
            element={
              <ReName
                loginUser={loginUser}
                setLoginUser={setLoginUser}
                db={db}
              ></ReName>
            }
          />
          <Route
            path="/kawaighostchan"
            element={<Ghost loginUser={loginUser}></Ghost>}
          />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
