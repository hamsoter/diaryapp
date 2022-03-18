import { Box, Button, Flex, ListItem, Text } from '@chakra-ui/react';
import React from 'react';

const Diary = props => {
  const { name, id, lastRecord } = props;
  console.log();
  return (
    <ListItem
      bg={'green.500'}
      w={['100%', '48%', '31.5%']}
      h={['400px', '400px', '250px']}
      listStyleType={'none'}
      borderRightRadius={'2xl'}
      display={'flex'}
      flexDir={'column'}
      my={2}
    >
      <Text fontSize={'lg'}>{name}</Text>
      <Text fontSize={'xs'}>
        마지막 업데이트 {lastRecord.toLocaleDateString()}
      </Text>
    </ListItem>
  );
};

export default Diary;
