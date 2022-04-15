import { ArrowBackIcon } from '@chakra-ui/icons';

import {
  Box,
  Center,
  Flex,
  Heading,
  IconButton,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/DiaryLists/Header';
import MainContent from '../../components/UI/MainContent';
import HamburgerMenu from '../UI/HamburgerMenu';
import CurrentDay from './CurrentDay';
import CurrnetMain from './CurrentMain';
import YearFilter from './YearFilter';

import { ref, update, getDatabase } from '@firebase/database';

const CurrentDiary = ({ thisDiary, thisParam }) => {
  const dbref = ref(getDatabase());

  const thisDiaryArr = Object.values(thisDiary);
  const thisDiaryPagesArr = thisDiary && Object.values(thisDiary.pages);

  console.log(thisDiary.pages, thisDiaryPagesArr);
  const navigate = useNavigate();

  const goBack = () => {
    navigate('/');
  };

  // console.log(thisDiary);

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const yearChangeHandler = year => {
    setSelectedYear(year);
  };

  const deleteThisDiary = () => {
    console.log(thisDiary.id, '를 삭제?');

    const updates = {};
    updates['diaries/' + thisDiary.id + '/'] = null;

    update(dbref, updates);
    goBack();
  };

  // 선택된 연도로 필터된 일기
  const filteredDiaries =
    thisDiary &&
    thisDiaryPagesArr
      .filter(item => {
        console.log(item.date);
        const date = new Date(item.date);
        console.log(date.getFullYear());
        if (date.getFullYear() === selectedYear) {
          return item;
        }
      })
      .sort(function (a, b) {
        const aDate = a.date;
        const bDate = b.date;

        return new Date(bDate) - new Date(aDate);
      });

  return (
    <>
      <Header
        title={thisDiary.title}
        leftContent={
          <IconButton
            colorScheme={'orange'}
            bg={'transparent'}
            aria-label="back-btn"
            icon={<ArrowBackIcon boxSize="5" onClick={goBack} />}
          />
        }
        rightContent={<HamburgerMenu deleteThisDiary={deleteThisDiary} />}
      />
      <MainContent w={'100%'}>
        <Flex w={'auto'} flexDir={'column'}>
          <CurrnetMain thisDiary={thisDiary}></CurrnetMain>
          <YearFilter
            data={thisDiaryPagesArr}
            selected={selectedYear}
            onSelectYear={yearChangeHandler}
          ></YearFilter>

          {thisDiaryArr.pages == 0 && (
            <Center>
              <Box
                bg={'orange.50'}
                borderRadius={'md'}
                color={'blackAlpha.700'}
                mt={6}
                py={3}
                display={'flex'}
                flexDir={'column'}
                alignItems={'center'}
                w={'240px'}
                gap={0}
              >
                <Heading fontSize={'xl'}>텅 비었어요!</Heading>
                <Text mt={6} fontSize="lg">
                  너무 춥고 쓸쓸해요...🍃<br></br> 뭐라고 써보는 건 어떨까요?
                </Text>
              </Box>
            </Center>
          )}
          <UnorderedList ml={0} className={'daily-lists'}>
            {/* list */}

            {filteredDiaries &&
              filteredDiaries.map(item => {
                return (
                  <Link
                    key={item.id}
                    to={`/diary/${thisParam}/${item.id}/read`}
                  >
                    <CurrentDay
                      writer={thisDiary.userName}
                      key={item.id}
                      title={item.title}
                      content={item.content}
                      mood={item.mood}
                      date={new Date(item.date)}
                    ></CurrentDay>
                  </Link>
                );
              })}
          </UnorderedList>
        </Flex>
      </MainContent>
    </>
  );
};

export default CurrentDiary;
