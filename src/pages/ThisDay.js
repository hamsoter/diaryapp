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
  const diaries = props.getTempDiaries;

  // App에서 다이어리를 세팅하는 메서드를 기져옴
  const setDiaries = props.setTempDiaries;

  const location = useLocation();
  const navigate = useNavigate(-1);

  const id = location.pathname.split('/')[3];
  const modeParam = location.pathname.split('/')[4];

  const goBack = () => {
    navigate(-1);
  };

  const [mode, setMode] = useState(modeParam);

  console.log(props);

  return (
    <ChakraProvider h={'100%'} theme={theme}>
      {mode === 'read' ? <Read onBack={goBack}></Read> : <Write></Write>}
    </ChakraProvider>
  );
};

export default ThisDay;
