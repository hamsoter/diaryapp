import React from 'react';
import './components/UI/App.css';

import {
  ChakraProvider,
  Box,
  theme,
  useControllableState,
  Flex,
  Spacer,
  Heading,
} from '@chakra-ui/react';
import DiaryLists from './components/Diary/DiaryLists';
import AddDiaryModal from './components/Diary/AddDiaryModal';

function App() {
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
        <Flex
          borderTopRadius={'md'}
          bg={'orange.400'}
          color={'white'}
          alignItems={'center'}
          p={3}
          w={['100%']}
        >
          <Heading fontSize={'xl'} isTruncated>
            나의 책장
          </Heading>
          <Spacer></Spacer>
          <AddDiaryModal onSaveDiary={saveDiaryHandler}></AddDiaryModal>
        </Flex>
        <DiaryLists diaries={diaries}></DiaryLists>
      </Box>
    </ChakraProvider>
  );
}

export default App;
