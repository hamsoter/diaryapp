import { ChakraProvider, theme } from '@chakra-ui/react';
import Header from '../components/DiaryLists/Header';
import MainContainer from '../components/UI/MainContainer';
import MainContent from '../components/UI/MainContent';

const MyPage = () => {
  let content = <>dd</>;
  return (
    <ChakraProvider h={'100%'} theme={theme}>
      <MainContainer>
        <Header />
        <MainContent>{content}</MainContent>
      </MainContainer>
    </ChakraProvider>
  );
};

export default MyPage;
