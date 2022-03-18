import { ListItem, UnorderedList } from '@chakra-ui/react';
import React from 'react';
import Diary from './Diary';

const DiaryLists = props => {
  const { diaries } = props;

  return (
    <UnorderedList
      pt={3}
      m={0}
      bg={'orange.50'}
      borderBottomRadius={'md'}
      minH={'80vh'}
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
