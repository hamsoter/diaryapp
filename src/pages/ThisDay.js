import { ChakraProvider, IconButton, theme } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/DiaryLists/Header';
import Read from '../components/ThisDay/Read';
import Write from '../components/ThisDay/Write';
import MainContainer from '../components/UI/MainContainer';
import MainContent from '../components/UI/MainContent';

const ThisDay = props => {
  // App에서 다이어리 배열을 임시로 받아옴.
  const diaries = props.getTempDiaries()[0];

  // 유저명. 차후수정
  const writer = diaries.userName;

  // App에서 다이어리를 세팅하는 메서드를 기져옴
  const setDiaries = props.setTempDiaries;

  const location = useLocation();
  const navigate = useNavigate(-1);

  const paramId = location.pathname.split('/')[3];
  const diaryId = location.pathname.split('/')[2];

  // const paramMode = location.pathname.split('/')[4];

  const saveData = data => {
    const newData = data;

    // 정렬?

    diaries.pages = [newData, ...diaries.pages].sort(function (a, b) {
      a = a.date;
      b = b.date;
      return a > b ? -1 : a < b ? 1 : 0;
    });

    console.log(diaries.pages);
    // 페이지이동
    // window.history.back();
    pageChange(newData);

    // navigate(`/comment/`);
  };

  const pageChange = newData => {
    navigate(`/diary/${diaryId}/${newData.id}/read/`);
    setMode('read');
  };

  const data =
    diaries.pages &&
    diaries.pages.filter(item => {
      return item.id === paramId;
    })[0];

  const goBack = () => {
    console.log('di');
    navigate(`/diary/${diaryId}`);
  };

  const [mode, setMode] = useState(props.mode);

  return (
    <ChakraProvider h={'100%'} theme={theme}>
      {mode === 'read' && <Read onBack={goBack} data={data}></Read>}
      {mode === 'write' && (
        <Write onBack={goBack} writer={writer} saveData={saveData}></Write>
      )}
      {mode === 'update' && <Write onBack={goBack} writer={writer}></Write>}
    </ChakraProvider>
  );
};

export default ThisDay;
