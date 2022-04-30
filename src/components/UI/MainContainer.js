import { chakra, Container } from '@chakra-ui/react';

const MainContainer = chakra(Container, {
  baseStyle: {
    flexDir: 'column',
    w: ['100%', '430px', '760px'],
    maxW: '100%',
    p: 0,
    m: '0 auto',
  },
});

export default MainContainer;
