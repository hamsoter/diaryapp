import React, { useEffect, useState } from 'react';

import '../components/UI/App.css';
import { Center, ChakraProvider, Flex, Spinner, theme } from '@chakra-ui/react';

import DiaryLists from '../components/DiaryLists/DiaryLists';
import AddDiaryModal from '../components/DiaryLists/AddDiaryModal';
import Header from '../components/DiaryLists/Header';
import MainContents from '../components/UI/MainContents';
import MainContainer from '../components/UI/MainContainer';

// firebase
import { ref, set } from '@firebase/database';

import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

const MyLibrary = ({ db, loadDiaries, loginUser }) => {
  const auth = getAuth();

  const navigate = useNavigate();

  const [diaries, setDiaries] = React.useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    // 로그인 체크
    auth.onAuthStateChanged(async user => {
      if (user) {
        console.log('로그인됨', user.uid);

        const data = await loadDiaries(user.uid);

        setDiaries(data);
        setIsLoading(false);
      } else {
        console.log('로그인안됨');
        navigate('/login');
      }
    });
    // 최초 한번만 실행
  }, []);

  const saveDiaryHandler = newDiary => {
    newDiary.owner = loginUser;

    set(ref(db, '/diaries/' + newDiary.id), {
      id: newDiary.id,
      owner: loginUser,
      color: newDiary.color,
      title: newDiary.title,

      lastRecord: newDiary.lastRecord.toString(),
    });

    loadDiaries(loginUser.id);

    setDiaries(prevState => {
      return [newDiary, ...prevState];
    });
  };

  return (
    <ChakraProvider h={'100%'} theme={theme}>
      <MainContainer>
        <Header
          isLoading={isLoading}
          title={'책장'}
          rightContent={
            <AddDiaryModal
              loginUser={loginUser}
              onSaveDiary={saveDiaryHandler}
            />
          }
        />

        <MainContents>
          {isLoading ? (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor={'whiteAlpha.500'}
              color="orange.200"
              size="xl"
              mt={10}
            />
          ) : (
            <DiaryLists diaries={diaries}></DiaryLists>
          )}
        </MainContents>
      </MainContainer>
    </ChakraProvider>
  );
};

export default MyLibrary;
