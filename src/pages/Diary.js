import { ChakraProvider, theme } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import MainContainer from '../components/UI/MainContainer';
import CurrentDiary from '../components/Diary/CurrentDiary';
import { useNavigate } from 'react-router-dom';

import { NotAllowedIcon } from '@chakra-ui/icons';
import { getAuth } from 'firebase/auth';

// http://localhost:3000/diary/8ug8bk
const Diary = ({
  notFoundFlag,
  getDiariesArr,
  setMissingCount,
  db,
  loadDiaries,
  loginUser,
}) => {
  const navigate = useNavigate();

  // 찾아낸 다이어리를 저장할 공간
  const [thisDiary, setThisDiary] = useState('');

  // 현재 url의 uuid 잘라내기
  const thisParamId = window.location.pathname.split('/')[2];

  // 렌더 무한루프 방지 순서 처리
  // 주소 유효값 검사

  const auth = getAuth();

  useEffect(() => {
    // 로그인 체크
    auth.onAuthStateChanged(async user => {
      if (user) {
        console.log('로그인됨', user);

        // App에서 다이어리 배열을 임시로 받아옴.
        const diaries = await loadDiaries(user.uid);

        console.log(diaries);

        const findById = () => {
          const result = diaries.find(item => {
            return item.id == thisParamId;
          });
          // 찾은 객체 리턴
          return result;
        };

        if (findById() && loginUser.id === findById().owner.id) {
          setThisDiary(findById());
        } else {
          setMissingCount(prevCount => prevCount + 1);
          navigate('/error');
        }
      } else {
        console.log('로그인안됨');
        navigate('/login');
        return;
      }
    });
    return () => setThisDiary(false);
  }, []);

  let content = <CurrentDiary thisDiary={thisDiary} thisParam={thisParamId} />;

  return (
    <ChakraProvider h={'100%'} theme={theme}>
      <MainContainer>{content}</MainContainer>
    </ChakraProvider>
  );
};

export default Diary;
