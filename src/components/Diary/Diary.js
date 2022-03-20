import { Box, Button, Flex, ListItem, Text } from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react/cjs/react.production.min';

const Diary = props => {
  const { name, id, lastRecord, color, title } = props;

  const liStyles = {
    bg: color.mainColor,
    borderRightRadius: '2xl',
    justifyContent: 'center',
    display: 'flex',
    flexDir: 'column',
    m: '1.5',
    w: ['100%', '226px', '230px'],
    h: ['400px', '230px', '250px'],
  };

  // console.log
  return (
    <ListItem {...liStyles}>
      <Box bg={color.subColor} color={color.trextColor} p={2}>
        <Text fontSize={['3xl', 'xl', 'lg']}>{title}</Text>
        <Text fontSize={'xs'}>
          마지막 업데이트 {lastRecord.toLocaleDateString()}
        </Text>
      </Box>
      <Text
        fontWeight={'bold'}
        fontSize={['md', 'sm', 'xs']}
        color={color.subColor}
        ml={'2'}
      >
        '{name}'의 일기
      </Text>
    </ListItem>
  );
};

export default Diary;
