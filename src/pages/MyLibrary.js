import React, { useEffect, useState } from 'react';

import '../components/UI/App.css';
import { ChakraProvider, theme } from '@chakra-ui/react';

import DiaryLists from '../components/DiaryLists/DiaryLists';
import AddDiaryModal from '../components/DiaryLists/AddDiaryModal';
import Header from '../components/DiaryLists/Header';
import MainContents from '../components/UI/MainContents';
import MainContainer from '../components/UI/MainContainer';

// firebase
import { ref, set, get } from '@firebase/database';

import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

const MyLibrary = ({ db, loadDiaries }) => {
  const auth = getAuth();

  const navigate = useNavigate();

  const [diaries, setDiaries] = React.useState([]);

  const [userInfo, setUserInfo] = useState();

  useEffect(async () => {
    // 로그인 체크
    auth.onAuthStateChanged(user => {
      if (user) {
        console.log('로그인됨', user.uid);
        setUserInfo(user);

        console.log(userInfo);
      } else {
        console.log('로그인안됨');
        navigate('/login');
      }
    });

    const data = await loadDiaries();

    setDiaries(data);

    // 최초 한번만 실행
  }, []);

  const saveDiaryHandler = newDiary => {
    console.log(userInfo);

    set(ref(db, userInfo.uid + '/diaries/' + newDiary.id), {
      id: newDiary.id,
      userUid: userInfo.uid,
      userName: newDiary.userName,
      color: newDiary.color,
      title: newDiary.title,

      lastRecord: newDiary.lastRecord.toString(),
    });

    setDiaries(prevState => {
      return [newDiary, ...prevState];
    });
  };

  // setTempDiaries(diaries);

  return (
    <ChakraProvider h={'100%'} theme={theme}>
      {/* <Box h={'100%'} w={['100%', '400px', '750px']} m="auto"> */}
      <MainContainer>
        <Header
          title={'책장'}
          rightContent={<AddDiaryModal onSaveDiary={saveDiaryHandler} />}
        />
        {/* <MainContent>
          <DiaryLists diaries={diaries}></DiaryLists>
        </MainContent> */}

        <MainContents>
          <DiaryLists diaries={diaries}></DiaryLists>
        </MainContents>
        {/* </Box> */}
      </MainContainer>
    </ChakraProvider>
  );
};

export default MyLibrary;
