import React from 'react';

import '../components/UI/App.css';
import { ChakraProvider, Box, theme, chakra } from '@chakra-ui/react';

import DiaryLists from '../components/DiaryLists/DiaryLists';
import AddDiaryModal from '../components/DiaryLists/AddDiaryModal';
import Header from '../components/DiaryLists/Header';
import MainContent from '../components/UI/MainContent';
import MainContents from '../components/UI/MainContents';
import MainContainer from '../components/UI/MainContainer';

const MyLibrary = props => {
  let DUMMY_DATA_ARR = props.getTempDiaries();

  const [diaries, setDiaries] = React.useState(DUMMY_DATA_ARR);

  console.log(diaries);

  const saveDiaryHandler = newDiary => {
    setDiaries(prevState => {
      return [newDiary, ...prevState];
    });
  };

  props.setTempDiaries(diaries);

  return (
    <ChakraProvider h={'100%'} theme={theme}>
      {/* <Box h={'100%'} w={['100%', '400px', '750px']} m="auto"> */}
      <MainContainer>
        <Header
          title={'책장'}
          rightContent={<AddDiaryModal onSaveDiary={saveDiaryHandler} />}
        />
        {/* <MainContent>
          <DiaryLists diaries={diaries}></DiaryLists>
        </MainContent> */}

        <MainContents>
          <DiaryLists diaries={diaries}></DiaryLists>
        </MainContents>
        {/* </Box> */}
      </MainContainer>
    </ChakraProvider>
  );
};

export default MyLibrary;
