import React from 'react';

import { Flex, Heading, Box, Center } from '@chakra-ui/react';

const Header = props => {
  console.log();
  const leftContent = props.leftContent;
  const rightContent = props.rightContent;
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
    <Flex position={'relative'} {...styles}>
      <Heading w={'100%'} fontSize={'xl'} isTruncated>
        <Center ml={'40px'} w>
          {title}
        </Center>
      </Heading>
      <Box position={'absolute'} left={3}>
        {leftContent}
      </Box>
      <Box right={3}>{rightContent}</Box>
    </Flex>
  );
};

export default Header;
