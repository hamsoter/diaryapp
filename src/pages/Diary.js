import { ChakraProvider, theme } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import MainContainer from '../components/UI/MainContainer';
import CurrentDiary from '../components/Diary/CurrentDiary';
import { useNavigate } from 'react-router-dom';

import { ref, get, query, orderByChild, equalTo } from '@firebase/database';
import { getAuth } from 'firebase/auth';

// http://localhost:3000/diary/8ug8bk
const Diary = ({ db }) => {
  const navigate = useNavigate();

  // 찾아낸 다이어리를 저장할 공간
  const [thisDiary, setThisDiary] = useState({ owner: { name: '' } });

  // 현재 url의 uuid 잘라내기
  const thisParamId = window.location.pathname.split('/')[2];

  // 렌더 무한루프 방지 순서 처리
  // 주소 유효값 검사

  const auth = getAuth();

  const getPages = async () => {
    // 일기 페이지를 가져옴
    const thisPages = await get(
      query(ref(db, 'pages'), orderByChild('diary/id'), equalTo(thisParamId))
    );

    if (thisPages.val()) {
      return thisPages.val();
    }
  };

  useEffect(() => {
    // 로그인 체크
    auth.onAuthStateChanged(async user => {
      if (user) {
        console.log('로그인됨', user);

        // const findById = () => {
        //   const result = diaries.find(item => {
        //     return item.id == thisParamId;
        //   });
        //   // 찾은 객체 리턴
        //   return result;
        // };

        // findById
        const findById = await get(
          query(ref(db, 'diaries'), orderByChild('id'), equalTo(thisParamId))
        );

        // db에 존재하는 다이어리인지 확인
        if (findById.val() === null) {
          navigate('/error');
          return;
        }

        const result = Object.values(findById.val())[0];

        // 로그인한 유저의 다이어리인지 확인
        if (user.uid === result.owner.id) {
          setThisDiary(result);
        } else {
          navigate('/error');
          return;
        }
      } else {
        console.log('로그인안됨');
        navigate('/login');
        return;
      }
    });
    return () => setThisDiary(false);
  }, []);

  let content = (
    <CurrentDiary
      db={db}
      thisDiary={thisDiary}
      setThisDiary={setThisDiary}
      thisParam={thisParamId}
      getPages={getPages}
    />
  );

  return (
    <ChakraProvider h={'100%'} theme={theme}>
      <MainContainer>{content}</MainContainer>
    </ChakraProvider>
  );
};

export default Diary;
