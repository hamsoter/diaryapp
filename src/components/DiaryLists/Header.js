import React from 'react';

import { Flex, Spacer, Heading } from '@chakra-ui/react';

const Header = props => {
  const contents = props.rightContent;
  const title = props.title;

  // css style
  const styles = {
    bg: 'orange.400',
    borderTopRadius: 'md',
    h: '64px',
    color: 'white',
    alignItems: 'center',
    p: 3,
    w: '100%',
  };

  return (
    <Flex {...styles}>
      <Heading fontSize={'xl'} isTruncated>
        {title}
      </Heading>
      <Spacer></Spacer>
      {contents}
    </Flex>
  );
};

export default Header;
