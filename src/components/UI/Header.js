import React from 'react';

import { Flex, Spacer, Heading } from '@chakra-ui/react';

const Header = () => {
  return (
    <>
      <Flex
        borderTopRadius={'md'}
        bg={'orange.400'}
        color={'white'}
        alignItems={'center'}
        p={3}
        w={['100%']}
      >
        <Heading fontSize={'xl'} isTruncated>
          나의 책장
        </Heading>
        <Spacer></Spacer>
        <AddDiaryModal onSaveDiary={saveDiaryHandler}></AddDiaryModal>
      </Flex>
    </>
  );
};

export default Header;
