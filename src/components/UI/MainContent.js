import { Container, styled, Wrap } from '@chakra-ui/react';
import React from 'react';

const MainContent = props => {
  const style = {
    m: 0,
    p: 3,
    bg: 'orange.50',
    borderBottomRadius: 'md',
    display: 'flex',
    flexWrap: 'wrap',
  };

  return <Wrap {...style}>{props.children}</Wrap>;
};

export default MainContent;
