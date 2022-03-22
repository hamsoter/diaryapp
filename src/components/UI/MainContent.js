import { Container, styled, Wrap } from '@chakra-ui/react';
import React from 'react';

const MainContent = props => {
  const colorScheme = props.colorScheme;

  const style = {
    m: 'auto',
    p: 3,
    w: '100%',
    // 변동 가능성 o
    bg: colorScheme ? colorScheme.mainColor : 'orange.50',
    borderBottomRadius: 'md',
    display: 'flex',
    flexWrap: 'wrap',
    flexDir: 'column',
  };

  return <Wrap {...style}>{props.children}</Wrap>;
};

export default MainContent;
