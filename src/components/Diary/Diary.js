import { Box, Button, Flex, ListItem, Text } from '@chakra-ui/react';
import React from 'react';

const Diary = props => {
  const { name, id, lastRecord } = props;
  console.log();
  return (
    <ListItem
      bg={'green.500'}
      w={640 / 3 - 10}
      h={260}
      listStyleType={'none'}
      borderRightRadius={'2xl'}
      mb={4}
      display={'flex'}
      flexDir={'column'}
    >
      <Text fontSize={'lg'}>{name}</Text>
      <Text fontSize={'xs'}>
        마지막 업데이트 {lastRecord.toLocaleDateString()}
      </Text>
    </ListItem>
  );
};

export default Diary;
