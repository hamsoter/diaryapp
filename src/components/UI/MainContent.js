import { Container, styled, Wrap } from '@chakra-ui/react';
import React from 'react';

const MainContent = props => {
  const colorScheme = props.colorScheme;

  const style = {
    m: 'auto',
    p: 3,
    w: '100%',
    // 변동 가능성 o colorScheme ? 'colorScheme.mainColor' :
    bg: colorScheme ? colorScheme.normal100 : 'orange.100',
    borderBottomRadius: 'md',
    display: 'flex',
    flexWrap: 'wrap',
    flexDir: 'column',
    h: '91vh',
    overflow: 'auto',
    // 스크롤바
    sx: {
      '&::-webkit-scrollbar': {
        width: '16px',
        borderRadius: '8px',
        backgroundColor: `rgba(0, 0, 0, 0.05)`,
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: `rgba(0, 0, 0, 0.05)`,
      },
    },
  };

  return <Wrap {...style}>{props.children}</Wrap>;
};

export default MainContent;
