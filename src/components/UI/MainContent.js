import { Box, Container, styled, Wrap } from '@chakra-ui/react';
import React from 'react';

const MainContent = props => {
  const colorScheme = props.colorScheme;

  const style = {
    m: 'auto',
    p: [0, 0, 3],
    pr: [0, 0, 0],
    // 변동 가능성 o colorScheme ? 'colorScheme.mainColor' :
    bg: colorScheme ? colorScheme.normal100 : 'orange.100',
    borderBottomRadius: 'md',
    display: 'flex',
    flexWrap: 'wrap',
    flexDir: 'column',
    h: 'calc(100vh - 64px)',
    overflow: 'auto',
    // 스크롤바
    sx: {
      '&::-webkit-scrollbar': {
        width: '12px',
        backgroundColor: `rgba(0, 0, 0, 0.0)`,
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: `rgba(0, 0, 0, 0.05)`,
      },
    },
  };

  return (
    <Box className="main-content" {...style}>
      {props.children}
    </Box>
  );
};

export default MainContent;
