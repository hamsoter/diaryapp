import { Box, Button, Flex, ListItem, Text } from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react/cjs/react.production.min';

const Diary = props => {
  const { name, id, lastRecord, color, title } = props;
  console.log();
  const colorTheme = {
    mainColor: 'green.500',
    subColor: 'green.700',
    trextColor: 'white',
  };

  const [selectedColorTheme, setSelectedColorTheme] =
    React.useState(colorTheme);

  const liStyles = {
    bg: colorTheme.mainColor,
    borderRightRadius: '2xl',
    justifyContent: 'center',
    display: 'flex',
    flexDir: 'column',
    m: '1.5',
    w: ['100%', '226px', '230px'],
    h: ['400px', '230px', '250px'],
  };

  return (
    <ListItem {...liStyles}>
      <Box
        bg={selectedColorTheme.subColor}
        color={selectedColorTheme.trextColor}
        p={2}
      >
        <Text fontSize={['3xl', 'xl', 'lg']}>{title}</Text>
        <Text fontSize={'xs'}>
          마지막 업데이트 {lastRecord.toLocaleDateString()}
        </Text>
      </Box>
      <Text
        fontWeight={'bold'}
        fontSize={['md', 'sm', 'xs']}
        color={selectedColorTheme.subColor}
        ml={'2'}
      >
        '{name}'의 일기
      </Text>
    </ListItem>
  );
};

export default Diary;
