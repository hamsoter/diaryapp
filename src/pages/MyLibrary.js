import React from 'react';

import '../components/UI/App.css';
import { ChakraProvider, Box, theme } from '@chakra-ui/react';

import DiaryLists from '../components/DiaryLists/DiaryLists';
import AddDiaryModal from '../components/DiaryLists/AddDiaryModal';
import Header from '../components/DiaryLists/Header';
import MainContent from '../components/UI/MainContent';

const MyLibrary = props => {
  const DUMMY_DATA_ARR = [];

  const [diaries, setDiaries] = React.useState(DUMMY_DATA_ARR);

  const saveDiaryHandler = newDiary => {
    setDiaries(prevState => {
      return [newDiary, ...prevState];
    });
  };

  props.setTempDiaries(diaries);

  return (
    <ChakraProvider h={'100%'} theme={theme}>
      <Box h={'100%'} w={['100%', '500px', '750px']} m="auto">
        <Header
          title={'나의 책장'}
          rightContent={<AddDiaryModal onSaveDiary={saveDiaryHandler} />}
        />
        <MainContent>
          <DiaryLists diaries={diaries}></DiaryLists>
        </MainContent>
      </Box>
    </ChakraProvider>
  );
};

export default MyLibrary;
