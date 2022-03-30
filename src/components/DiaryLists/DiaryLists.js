import { Center, Flex, Heading, Text, UnorderedList } from '@chakra-ui/react';
import React from 'react';
import Card from '../UI/Card';
import Ul from '../UI/Ul';
import DiaryItem from './DiaryItem';

const DiaryLists = props => {
  const { diaries } = props;

  return (
    // <UnorderedList display={'flex'} m={0} width={'100%'} flexWrap="wrap">
    <Ul w={'100%'}>
      {diaries.length === 0 ? (
        <Center w="100%" mt="20">
          <Card
            fontSize={'lg'}
            px={20}
            py={10}
            boxShadow={'xs'}
            borderRadius={'md'}
            color="blackAlpha.700"
          >
            <Heading>∑(O_O;)</Heading>
            아무것도 없네요!
          </Card>
        </Center>
      ) : (
        diaries.map(diary => {
          // console.log(diary.id);
          return (
            <DiaryItem
              key={diary.id}
              id={diary.id}
              name={diary.userName}
              title={diary.title}
              color={diary.color}
              lastRecord={diary.lastRecord}
            />
          );
        })
      )}
    </Ul>
    // </UnorderedList>
  );
};

export default DiaryLists;
