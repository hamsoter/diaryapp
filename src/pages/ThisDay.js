import { ChakraProvider, IconButton, theme } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/DiaryLists/Header';
import Read from '../components/ThisDay/Read';
// import Update from '../components/ThisDay/Update';
import Write from '../components/ThisDay/Write';
import MainContainer from '../components/UI/MainContainer';
import MainContent from '../components/UI/MainContent';

const ThisDay = props => {
  const location = useLocation();
  const navigate = useNavigate();

  const paramId = location.pathname.split('/')[3];

  const diaryId = location.pathname.split('/')[2];

  const paramMode = location.pathname.split('/')[4];

  // App에서 다이어리 배열을 임시로 받아옴.
  const diaries = props.getTempDiaries().filter(item => item.id === diaryId)[0];

  // 유저명. 차후수정
  const writer = diaries.userName;

  // App에서 다이어리를 세팅하는 메서드를 기져옴
  const setDiaries = props.setTempDiaries;

  // const paramMode = location.pathname.split('/')[4];

  // url으로 읽어낼 데이터 찾아내기
  const data =
    diaries.pages &&
    diaries.pages.filter(item => {
      return item.id === paramId;
    })[0];

  const saveData = data => {
    const newData = data;

    // 날짜순 정렬
    diaries.pages = [newData, ...diaries.pages].sort(function (a, b) {
      a = a.date;
      b = b.date;
      return a > b ? -1 : a < b ? 1 : 0;
    });

    // 페이지이동
    pageChange(newData);
  };

  const updateData = newData => {
    // 수정시 데이터 아이디 자동부여 취소 (좋은 방법이 아닌 거 같음)
    newData.id = data.id;

    // 배열에서 바꿔줘야 할 index 찾기
    const changeIndex = diaries.pages.findIndex(item => item.id == data.id);

    // 바꾸기
    diaries.pages.splice(changeIndex, 1, newData);

    //페이지 변경
    pageChange(newData);
  };

  const pageChange = newData => {
    navigate(`/diary/${diaryId}/${newData.id}/read/`);
    setMode('read');
    console.log(mode);
  };

  const goBack = () => {
    console.log('di');
    navigate(`/diary/${diaryId}`);
  };

  const [mode, setMode] = useState(paramMode ? paramMode : props.mode);

  console.log('thisdaymode: ' + mode);

  return (
    <ChakraProvider h={'100%'} theme={theme}>
      {mode === 'read' && (
        <Read onBack={goBack} changeMode={setMode} data={data}></Read>
      )}
      {mode === 'write' && (
        <Write onBack={goBack} writer={writer} saveData={saveData}></Write>
      )}

      {mode === 'update' && (
        <Write
          mode={mode}
          onBack={goBack}
          writer={writer}
          data={data}
          saveData={updateData}
        ></Write>
      )}
    </ChakraProvider>
  );
};

export default ThisDay;
