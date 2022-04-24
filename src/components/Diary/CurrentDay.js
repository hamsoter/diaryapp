import React from 'react';
import {
  Box,
  Divider,
  Flex,
  Heading,
  Image,
  ListItem,
  Tag,
  Text,
} from '@chakra-ui/react';
import Card from '../UI/Card';

const CurrentDay = ({ title, content, date }) => {
  // 날짜 출력 편의를 위한 변수
  const weekArr = ['일', '월', '화', '수', '목', '금', '토'];
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const week = weekArr[date.getDay()];

  return (
    <ListItem pb={3} listStyleType={'none'}>
      <Card gap={3} flexDir={'column'} p={6} color={'blackAlpha.700'}>
        <Flex flexDir={'row'} alignItems={'center'} w={'100%'}>
          <Box display={'flex'} className="thisday-mood mood0" w={'100px'}>
            <Image
              w="100%"
              src=""
              fallbackSrc="https://via.placeholder.com/73"
            />
          </Box>
          <Box ml={6} w={'100%'}>
            <Heading mb={2} className="title" fontSize={'lg'} noOfLines="1">
              {title}
            </Heading>
            <Heading
              className="date"
              fontWeight={'sm'}
              fontSize={'sm'}
              noOfLines="1"
              color={'grey'}
            >
              {month}/{day}/{week}
            </Heading>
          </Box>
        </Flex>
        {/* <Divider orientation="vertical" h={['60px', '80px', '100px']}></Divider> */}
        <Card
          className="diary-thisday"
          display={'flex'}
          flexDir="column"
          bg={'transparent'}
          alignItems="left"
          m={0}
          p={0}
          w={'100%'}
        >
          <Text className="content" fontSize={'md'} noOfLines={[1, 2, 3]}>
            {content}
          </Text>
        </Card>
      </Card>
    </ListItem>
  );
};

export default CurrentDay;
