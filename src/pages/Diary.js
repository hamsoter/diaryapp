import { Box, ChakraProvider, Container, Text, theme } from '@chakra-ui/react';
import React, { useState } from 'react';
import Header from '../components/DiaryLists/Header';
import MainContent from '../components/UI/MainContent';

const Diary = props => {
  // App에서 다이어리 배열을 임시로 받아옴.
  const diaries = props.getTempDiaries();

  // 찾아낸 다이어리를 저장할 공간
  const [thisDiary, setThisDiary] = useState('');

  // 현재 url의 uuid 잘라내기
  const thisParamId = window.location.pathname.split('/')[2];

  const findById = () => {
    const result = diaries.find(item => {
      return item.id == thisParamId;
    });

    // 찾은 객체 리턴
    return result;
  };

  const init = () => {
    if (findById()) {
      setThisDiary(findById());
    } else {
      // url의 uuid 값을 찾지 못할 경우
      // 아래 메서드가 먼저 실행되어 무한루프 에러 생김
      console.log('error!');
    }
  };

  init();

  return (
    <ChakraProvider h={'100%'} theme={theme}>
      <Box h={'100%'} w={['100%', '500px', '750px']} m="auto">
        <Header title={'책이름'} rightContent={'버튼들어갈자리'} />
        <MainContent>
          <Box>dd</Box>
        </MainContent>
        {/* <DiaryLists diaries={diaries}></DiaryLists> */}
      </Box>
    </ChakraProvider>
  );
};

export default Diary;
