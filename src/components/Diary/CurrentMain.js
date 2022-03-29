import React from 'react';

import { EditIcon } from '@chakra-ui/icons';

import { Box, Button, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import Bubble from '../../components/UI/Bubble';
import Card from '../UI/Card';

const CurrnetMain = ({ thisDiary }) => {
  let location = useLocation();
  const path = `${location.pathname}`;

  return (
    <Card
      display={'flex'}
      alignItems={'center'}
      flexDir={'column'}
      bg={'#fffaf0a6'}
      borderRadius={2}
      py={10}
      mb={1}
      px={5}
      boxShadow={'xs'}
    >
      <Bubble>
        <Flex flexDir={'column'} w={'100%'} alignItems={'center'}>
          <Heading fontSize={['xl']} color="whiteAlpha.900">
            안녕하세요 {thisDiary.userName}
          </Heading>
          <Text fontSize={'nm'} color="whiteAlpha.900">
            일기 쓰기 좋은 날이네요!
          </Text>
        </Flex>
      </Bubble>
      <Image
        w={'150px'}
        src="https://user-images.githubusercontent.com/100299692/159457218-7faee460-a25a-4170-bfc9-54bd613abf0d.png"
        fallbackSrc="https://via.placeholder.com/150"
        m={'5'}
      ></Image>

      {/* 액션버튼 */}
      <Box displat={'flex'} width={'100%'} className="action-btns">
        <Link to={`${path}/write`}>
          <Button
            className="write-diary-btn"
            w={'100%'}
            size={'lg'}
            colorScheme={'orange'}
            bg={'orange.400'}
            color="white"
            aria-label="Send email"
            variant="solid"
          >
            일기 쓰기
            <EditIcon ml={2}></EditIcon>
          </Button>
        </Link>
      </Box>
    </Card>
  );
};

export default CurrnetMain;
