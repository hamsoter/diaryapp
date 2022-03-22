import { Box, ChakraProvider, theme } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import Header from '../components/DiaryLists/Header';
import MainContent from '../components/UI/MainContent';

const Diary = props => {
  // App에서 다이어리 배열을 임시로 받아옴.
  const diaries = props.getTempDiaries();

  // 찾아낸 다이어리를 저장할 공간
  const [thisDiary, setThisDiary] = useState('');

  const [notFoundFlag, setNotFoundFlag] = useState('false');

  // 현재 url의 uuid 잘라내기
  const thisParamId = window.location.pathname.split('/')[2];

  const findById = () => {
    const result = diaries.find(item => {
      return item.id == thisParamId;
    });

    // 찾은 객체 리턴
    return result;
  };

  // 렌더 무한루프 방지 순서 처리
  useEffect(() => {
    if (findById()) {
      setThisDiary(findById());

      console.log(thisDiary);
    } else {
      // url의 uuid 값을 찾지 못할 경우
      console.log('error!');
      setNotFoundFlag(false);
    }
  });

  let content = (
    <>
      <Header title={thisDiary.title} rightContent={'버튼들어갈자리'} />
      <MainContent />
    </>
  );

  // 존재하지 않는 주소로 들어갔을 때 컨텐츠 내용 변경
  if (!notFoundFlag) {
    content = (
      <>
        <Header title={'（￣□￣；） ... 페이지를 찾을 수 없어요! '} />
        <MainContent>
          잘못된 주소로 들어오셨네요! 도움을 드리지 못해 미안해요
        </MainContent>
      </>
    );
  }

  return (
    <ChakraProvider h={'100%'} theme={theme}>
      <Box h={'100%'} w={['100%', '500px', '750px']} m="auto">
        {content}
      </Box>
    </ChakraProvider>
  );
};

export default Diary;
