import React from 'react';
import { Box, Flex, Heading, Image, ListItem, Text } from '@chakra-ui/react';
import Card from '../UI/Card';

const CurrentPages = ({ title, content, date, mood }) => {
  // 날짜 출력 편의를 위한 변수
  const weekArr = ['일', '월', '화', '수', '목', '금', '토'];
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const week = weekArr[date.getDay()];

  const imgSrc = [
    'https://user-images.githubusercontent.com/100299692/165281611-90f31def-287e-46d4-b948-5b3c20113c02.png',
    'https://user-images.githubusercontent.com/100299692/165281598-4a5e2033-3f7a-4115-9347-64cf2ec88893.png',
    'https://user-images.githubusercontent.com/100299692/165281610-36e390a4-fab3-4146-a83c-4ccaf3c39b01.png',
    'https://user-images.githubusercontent.com/100299692/165281613-955ce4e2-fbfc-4d23-abf5-dda3e3bb0e34.png',
  ];

  return (
    <ListItem pb={3} listStyleType={'none'}>
      <Card gap={3} flexDir={'column'} p={6} color={'blackAlpha.700'}>
        <Flex flexDir={'row'} alignItems={'center'} w={'100%'}>
          <Box display={'flex'} className="thisday-mood mood0" w={'100px'}>
            <Image
              w="100%"
              src={imgSrc[mood]}
              fallbackSrc="https://via.placeholder.com/73"
            />
          </Box>
          <Box ml={6} w={'100%'}>
            <Heading
              textAlign={'left'}
              mb={2}
              className="title"
              fontSize={'lg'}
              noOfLines="1"
            >
              {title}
            </Heading>
            <Heading
              textAlign={'left'}
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

export default CurrentPages;
