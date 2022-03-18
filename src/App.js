import React from 'react';
import './components/UI/App.css';

import './components/UI/App.css';
import {
  ChakraProvider,
  Box,
  Text,
  theme,
  useControllableState,
  Button,
  Flex,
} from '@chakra-ui/react';
import DiaryLists from './components/Diary/DiaryLists';
// import { useState } from 'react/cjs/react.production.min';

function App() {
  const DUMMY_DATA_ARR = [
    {
      id: 'e1',
      name: '요리 기록',
      lastRecord: new Date(),
    },
    {
      id: 'e2',
      name: '책 일기',
      lastRecord: new Date(),
    },
    {
      id: 'e3',
      name: '나의 일상',
      lastRecord: new Date(),
    },
    {
      id: 'e4',
      name: '동숲 일기',
      lastRecord: new Date(),
    },
    {
      id: 'e5',
      name: '다이어트 일기',
      lastRecord: new Date(),
    },
    {
      id: 'e6',
      name: '육아 일기',
      lastRecord: new Date(),
    },
  ];

  const [diaries, setDiaries] = useControllableState({
    defaultValue: DUMMY_DATA_ARR,
  });
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
          <Text fontSize={'xl'} isTruncated>
            내 책장
          </Text>
          <Button colorScheme="orange" variant="solid" ml={'auto'}>
            +
          </Button>
        </Flex>
        <DiaryLists diaries={diaries}></DiaryLists>
      </Box>
    </ChakraProvider>
  );
}

export default App;
