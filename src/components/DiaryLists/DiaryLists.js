import { Flex, Heading, UnorderedList } from '@chakra-ui/react';
import React from 'react';
import DiaryItem from './DiaryItem';

const DiaryLists = props => {
  const { diaries } = props;

  return (
    <UnorderedList display={'flex'} m={0} width={'100%'} flexWrap="wrap">
      {diaries.length === 0 ? (
        <Flex
          h={['252px', '82px', '102px']}
          w={'100%'}
          justifyContent={'center'}
          mt={20}
        >
          <Heading fontSize={'xl'}>컨텐츠가 없어요</Heading>
        </Flex>
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
            ></DiaryItem>
          );
        })
      )}
    </UnorderedList>
  );
};

export default DiaryLists;
