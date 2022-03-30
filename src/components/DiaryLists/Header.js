import React from 'react';

import { Flex, Heading, Box, Center } from '@chakra-ui/react';

const Header = props => {
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
      <Heading
        w={'100%'}
        fontSize={'xl'}
        isTruncated
        display={'flex'}
        justifyContent="space-between"
      >
        <Box w={typeof props.leftContent === 'undefined' ? '100px' : 10}>
          {leftContent}
        </Box>
        <Center alignSelf={'center'}>{title}</Center>
        <Box
          w={typeof props.rightContent === 'undefined' ? '35px' : -10}
          fontSize="md"
          fontWeight={'bold'}
        >
          {rightContent}
        </Box>
      </Heading>
    </Flex>
  );
};

export default Header;
