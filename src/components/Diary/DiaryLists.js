import { ListItem, UnorderedList } from '@chakra-ui/react';
import React from 'react';
import Diary from './Diary';

const DiaryLists = props => {
  const { diaries } = props;

  return (
    <UnorderedList
      m={0}
      p={3}
      bg={'orange.50'}
      borderBottomRadius={'md'}
      display={'flex'}
      flexWrap="wrap"
      justifyContent={'space-between'}
    >
      {diaries.map(diary => {
        return (
          <Diary
            key={diary.id}
            name={diary.name}
            lastRecord={diary.lastRecord}
          ></Diary>
        );
      })}
    </UnorderedList>
  );
};

export default DiaryLists;
