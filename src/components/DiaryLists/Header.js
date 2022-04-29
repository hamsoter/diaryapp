import React from 'react';

import { Flex, Heading, Box, Center, Skeleton } from '@chakra-ui/react';

const Header = ({ leftContent, rightContent, title, isLoading }) => {
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
    <Flex
      position={'relative'}
      {...styles}
      bg={title === '⊂(・﹏・⊂)' ? 'teal' : 'orange.400'}
      pr={typeof rightContent === 'undefined' ? '50px' : 'auto'}
    >
      <Heading
        w={'100%'}
        fontSize={'xl'}
        isTruncated
        display={'flex'}
        justifyContent="space-between"
      >
        <Skeleton
          w={'100%'}
          display={'flex'}
          justifyContent="space-between"
          isLoaded={!isLoading}
          startColor={'whiteAlpha.300'}
          endColor="orange.500"
        >
          <Box w={typeof leftContent === 'undefined' ? '100px' : 10}>
            {leftContent}
          </Box>
          <Center alignSelf={'center'}>{title}</Center>
          <Box
            w={typeof rightContent === undefined ? '35px' : -10}
            fontSize="md"
            fontWeight={'bold'}
          >
            {rightContent}
          </Box>
        </Skeleton>
      </Heading>
    </Flex>
  );
};

export default Header;
