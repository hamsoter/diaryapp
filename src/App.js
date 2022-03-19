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
  const DUMMY_DATA_ARR = [
    {
      id: 'e1',
      userName: '요리 기록',
      lastRecord: new Date(),
    },
    {
      id: 'e2',
      userName: '일상',
      lastRecord: new Date(),
    },
    {
      id: 'e3',
      userName: '동숲 일기',
      lastRecord: new Date(),
    },
    {
      id: 'e4',
      userName: '다이어트 일기',
      lastRecord: new Date(),
    },
    {
      id: 'e5',
      userName: '육아 일기',
      lastRecord: new Date(),
    },
  ];

  const [diaries, setDiaries] = React.useState(DUMMY_DATA_ARR);

  const saveDiaryHandler = newDiary => {
    setDiaries(prevState => {
      return [...prevState, newDiary];
    });
  };

  return (
    <ChakraProvider theme={theme}>
      <Box w={['100%', '400px', '640px']} m="auto">
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
