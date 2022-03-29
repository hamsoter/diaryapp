import { ChakraProvider, theme } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import Header from '../components/DiaryLists/Header';
import MainContainer from '../components/UI/MainContainer';
import NotFound from '../components/Diary/NotFound';
import CurrentDiary from '../components/Diary/CurrentDiary';

const Diary = props => {
  // App에서 다이어리 배열을 임시로 받아옴.
  const diaries = props.getTempDiaries();

  // 찾아낸 다이어리를 저장할 공간
  const [thisDiary, setThisDiary] = useState('');

  // 일기장 존재 여부를 저장할 공간
  const [notFoundFlag, setNotFoundFlag] = useState('false');

  // 길 잃은 횟수 카운트
  const [missingCount, setMissingCount] = useState(1);

  // 현재 url의 uuid 잘라내기
  const thisParamId = window.location.pathname.split('/')[2];

  // 렌더 무한루프 방지 순서 처리
  // 주소 유효값 검사

  useEffect(() => {
    const findById = () => {
      const result = diaries.find(item => {
        return item.id == thisParamId;
      });
      // 찾은 객체 리턴
      return result;
    };

    if (findById()) {
      setThisDiary(findById());
    } else {
      // url의 uuid 값을 찾지 못할 경우
      setNotFoundFlag(false);
    }
    // 404페이지 카운트
    if (!notFoundFlag) {
      console.log(notFoundFlag);
      setMissingCount(prevCount => prevCount + 1);
    }
  }, [thisDiary, diaries, thisParamId, notFoundFlag]);

  let content = <CurrentDiary thisDiary={thisDiary} thisParam={thisParamId} />;

  // 존재하지 않는 주소로 들어갔을 때 컨텐츠 내용 변경
  if (!notFoundFlag) {
    content = (
      <>
        <Header title={' 미아 발견! '} rightContent={''} />
        <NotFound missingCount={missingCount} />
      </>
    );
  }

  return (
    <ChakraProvider h={'100%'} theme={theme}>
      <MainContainer>{content}</MainContainer>
    </ChakraProvider>
  );
};

export default Diary;
