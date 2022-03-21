import React from 'react';

import { ChakraProvider, Box, theme } from '@chakra-ui/react';

import DiaryLists from '../components/DiaryLists/DiaryLists';
import AddDiaryModal from '../components/DiaryLists/AddDiaryModal';
import Header from '../components/DiaryLists/Header';

const MyLibrary = () => {
  const DUMMY_DATA_ARR = [];

  const [diaries, setDiaries] = React.useState(DUMMY_DATA_ARR);

  const saveDiaryHandler = newDiary => {
    setDiaries(prevState => {
      return [newDiary, ...prevState];
    });
  };

  return (
    <ChakraProvider h={'100%'} theme={theme}>
      <Box h={'100%'} w={['100%', '500px', '750px']} m="auto">
        <Header
          rightContent={<AddDiaryModal onSaveDiary={saveDiaryHandler} />}
        />
        <DiaryLists diaries={diaries}></DiaryLists>
      </Box>
    </ChakraProvider>
  );
};

export default MyLibrary;
