import { chakra, Container, Flex } from '@chakra-ui/react';
import React from 'react';

const MainContainer = chakra(Container, {
  baseStyle: {
    flexDir: 'column',
    w: ['100%', '430px', '760px'],
    maxW: '100%',
    p: 0,
  },
});

export default MainContainer;
