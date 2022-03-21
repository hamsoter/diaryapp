import { Box, ListItem, Text } from '@chakra-ui/react';
import React from 'react';
import { ScaleFade } from '@chakra-ui/react';

const Diary = props => {
  const { name, lastRecord, color, title } = props;

  const liStyles = {
    bg: color.mainColor,
    borderRightRadius: '2xl',
    justifyContent: 'center',
    display: 'flex',
    flexDir: 'column',
    m: '1.5',
    w: ['auto', '226px', '230px'],
    h: ['400px', '230px', '250px'],
  };

  // console.log
  return (
    <ScaleFade
      w={['100%', 'auto', 'auto']}
      in={true}
      initialScale={0.4}
      transition={0.1}
    >
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
    </ScaleFade>
  );
};

export default Diary;
