import { ChakraProvider, theme } from '@chakra-ui/react';
import React from 'react';
import NotFound from '../components/Diary/NotFound';
import Header from '../components/DiaryLists/Header';
import MainContainer from '../components/UI/MainContainer';

const NotFoundPage = () => {
  return (
    <ChakraProvider h={'100%'} theme={theme}>
      <MainContainer>
        <Header title={''} rightContent={''} />
        <NotFound />
      </MainContainer>
    </ChakraProvider>
  );
};

export default NotFoundPage;
