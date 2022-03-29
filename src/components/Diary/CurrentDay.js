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

const CurrentDay = ({ title, content, mood, date, param }) => {
  // 날짜 출력 편의를 위한 변수
  const thisDate = new Date(date);
  const weekArr = ['일', '월', '화', '수', '목', '금', '토'];
  const year = thisDate.getFullYear();
  const month = thisDate.getMonth() + 1;
  const day = thisDate.getDate();
  const week = weekArr[thisDate.getDay()];

  console.log(year, month, day, week);

  return (
    <ListItem px={['5', '5', '0']} py={2.5}>
      <Card
        flexDir={'row'}
        boxShadow={'xs'}
        rounded="lg"
        p={['3', '5', '10']}
        color={'blackAlpha.700'}
      >
        <Flex flexDir={'column'}>
          <Box className="thisday-mood mood0" w={['70px', '70px', '100px']}>
            <Image
              w="100%"
              src="https://user-images.githubusercontent.com/100299692/159513668-9d668b5d-3377-45cb-9363-8a9a7727c9c4.png"
              fallbackSrc="https://via.placeholder.com/130"
            />
          </Box>
          <Tag
            colorScheme={'green'}
            display={'flex'}
            fontSize={['xs', 'xs', 'md']}
            justifyContent={'center'}
            mt={['1', '2', '3']}
          >
            {month}/{day} {week}
          </Tag>
        </Flex>
        <Divider orientation="vertical" h={['60px', '80px', '100px']}></Divider>
        <Card
          className="diary-thisday"
          display={'flex'}
          flexDir="column"
          bg={'transparent'}
          alignItems="left"
          m={0}
          p={0}
          gap={['1', '2', '3']}
        >
          <Heading
            className="title"
            fontSize={['17', '17', 'lg']}
            noOfLines="1"
          >
            {title}
          </Heading>
          <Text
            className="content"
            fontSize={['sm', 'sm', 'md']}
            noOfLines={[1, 2, 3]}
          >
            {content}
          </Text>
        </Card>
      </Card>
    </ListItem>
  );
};

export default CurrentDay;
