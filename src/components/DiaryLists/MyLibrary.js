import React from 'react';
import '../UI/App.css';

import {
  ChakraProvider,
  Box,
  theme,
  Flex,
  Spacer,
  Heading,
} from '@chakra-ui/react';

import DiaryLists from './DiaryLists';
import AddDiaryModal from './AddDiaryModal';
import Header from './Header';

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
        ></Header>
        <DiaryLists diaries={diaries}></DiaryLists>
      </Box>
    </ChakraProvider>
  );
};

export default MyLibrary;
