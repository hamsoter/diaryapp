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

  // App에서 다이어리를 세팅하는 메서드를 기져옴
  const setDiaries = props.setTempDiaries;

  const location = useLocation();
  const navigate = useNavigate(-1);

  const paramId = location.pathname.split('/')[3];
  // const paramMode = location.pathname.split('/')[4];

  const data =
    diaries.pages &&
    diaries.pages.filter(item => {
      return item.id === paramId;
    })[0];

  const goBack = () => {
    navigate(-1);
  };

  const [mode, setMode] = useState(props.mode);

  return (
    <ChakraProvider h={'100%'} theme={theme}>
      {mode === 'read' && <Read onBack={goBack} data={data}></Read>}
      {mode === 'write' && <Write onBack={goBack}></Write>}
      {mode === 'update' && <Write onBack={goBack}></Write>}
    </ChakraProvider>
  );
};

export default ThisDay;
