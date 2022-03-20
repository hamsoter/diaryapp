import { color, Flex, Heading, UnorderedList } from '@chakra-ui/react';
import React from 'react';
import Diary from './Diary';

const DiaryLists = props => {
  const { diaries } = props;

  const colorTheme = {
    mainColor: 'green.500',
    subColor: 'green.700',
    trextColor: 'white',
  };
  const [selectedColorTheme, setSelectedColorTheme] =
    React.useState(colorTheme);

  return (
    <UnorderedList
      m={0}
      p={3}
      bg={'orange.50'}
      borderBottomRadius={'md'}
      display={'flex'}
      flexWrap="wrap"
    >
      {diaries.length == 0 ? (
        <Flex h={'89vh'} w={'100%'} justifyContent={'center'} mt={40}>
          <Heading fontSize={'xl'}>컨텐츠가 없어요</Heading>
        </Flex>
      ) : (
        diaries.map(diary => {
          console.log(diary.color);
          return (
            <Diary
              key={diary.id}
              name={diary.userName}
              title={diary.title}
              color={diary.color}
              lastRecord={diary.lastRecord}
            ></Diary>
          );
        })
      )}
    </UnorderedList>
  );
};

export default DiaryLists;
