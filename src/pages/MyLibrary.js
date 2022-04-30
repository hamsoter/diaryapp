import React, { useEffect, useState } from 'react';

import '../components/UI/App.css';
import { ChakraProvider, Spinner, theme } from '@chakra-ui/react';

import DiaryLists from '../components/DiaryLists/DiaryLists';
import AddDiaryModal from '../components/DiaryLists/AddDiaryModal';
import Header from '../components/DiaryLists/Header';
import MainContents from '../components/UI/MainContents';
import MainContainer from '../components/UI/MainContainer';

// firebase
import { ref, set } from '@firebase/database';

import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import MyLibraryMenu from '../components/UI/MyLibraryMenu';
import useIsMount from '../useIsMount';

const MyLibrary = ({ db, loadDiaries, loginUser }) => {
  const auth = getAuth();
  const isMount = useIsMount();

  const navigate = useNavigate();

  const [diaries, setDiaries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 로그인 체크
    const fetchData = async () => {
      await auth.onAuthStateChanged(async user => {
        if (user) {
          const data = await loadDiaries(user.uid);

          if (isMount.current) {
            setDiaries(data);
            setIsLoading(false);
          }
        } else {
          navigate('/login');
        }
      });
    };
    fetchData();
    // return () => {
    //   setDiaries(false);
    // };
  }, [isMount, auth, loadDiaries, navigate]);

  const saveDiaryHandler = newDiary => {
    newDiary.owner = loginUser.id;

    set(ref(db, '/diaries/' + newDiary.id), {
      id: newDiary.id,
      // owner: loginUser,
      owner: loginUser.id,
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
          title={diaries.length !== 0 ? `책장(${diaries.length})` : '책장'}
          leftContent={<MyLibraryMenu />}
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
            <DiaryLists loginUser={loginUser} diaries={diaries}></DiaryLists>
          )}
        </MainContents>
      </MainContainer>
    </ChakraProvider>
  );
};

export default MyLibrary;
