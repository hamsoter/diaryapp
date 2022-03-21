import { Box, ChakraProvider, Container, Text, theme } from '@chakra-ui/react';
import react from 'react';
import Header from '../components/DiaryLists/Header';

const Diary = () => {
  return (
    <ChakraProvider h={'100%'} theme={theme}>
      <Box h={'100%'} w={['100%', '500px', '750px']} m="auto">
        <Header title={'책이름'} rightContent={'버튼들어갈자리'} />
        <Container></Container>
        {/* <DiaryLists diaries={diaries}></DiaryLists> */}
      </Box>
    </ChakraProvider>
  );
};

export default Diary;
