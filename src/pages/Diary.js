import { ChakraProvider, theme } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import MainContainer from '../components/UI/MainContainer';
import CurrentDiary from '../components/Diary/CurrentDiary';
import { useNavigate } from 'react-router-dom';

import { NotAllowedIcon } from '@chakra-ui/icons';

const Diary = ({ notFoundFlag, getDiariesArr, setMissingCount, db }) => {
  // App에서 다이어리 배열을 임시로 받아옴.
  const diaries = getDiariesArr();

  const navigate = useNavigate();

  // 찾아낸 다이어리를 저장할 공간
  const [thisDiary, setThisDiary] = useState('');

  // 현재 url의 uuid 잘라내기
  const thisParamId = window.location.pathname.split('/')[2];

  // 렌더 무한루프 방지 순서 처리
  // 주소 유효값 검사

  useEffect(() => {
    console.log(diaries);
    const findById = () => {
      const result = diaries.find(item => {
        return item.id == thisParamId;
      });
      // 찾은 객체 리턴
      return result;
    };

    const result = findById();

    if (findById()) {
      console.log(result);
      setThisDiary(result);
    } else {
      setMissingCount(prevCount => prevCount + 1);
      navigate('/error');
    }
  }, [thisDiary, diaries, thisParamId, notFoundFlag]);

  let content = <CurrentDiary thisDiary={thisDiary} thisParam={thisParamId} />;

  return (
    <ChakraProvider h={'100%'} theme={theme}>
      <MainContainer>{content}</MainContainer>
    </ChakraProvider>
  );
};

export default Diary;
