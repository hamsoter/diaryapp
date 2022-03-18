import { Box, Button, Flex, ListItem, Text } from '@chakra-ui/react';
import React from 'react';

const Diary = props => {
  const { name, id, lastRecord } = props;
  console.log();
  const colorTheme = {
    mainColor: 'green.500',
    subColor: 'green.700',
    trextColor: 'white',
  };

  const liStyles = {
    bg: colorTheme.mainColor,
    borderRightRadius: '2xl',
    justifyContent: 'center',
    display: 'flex',
    flexDir: 'column',
    my: '2',
    w: ['100%', '48%', '31.5%'],
    h: ['400px', '230px', '250px'],
  };

  return (
    <ListItem {...liStyles}>
      <Box bg={colorTheme.subColor} color={colorTheme.trextColor} p={2}>
        <Text fontSize={['3xl', 'xl', 'lg']}>{name}</Text>
        <Text fontSize={'xs'}>
          마지막 업데이트 {lastRecord.toLocaleDateString()}
        </Text>
      </Box>
    </ListItem>
  );
};

export default Diary;
