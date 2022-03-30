import { ArrowBackIcon } from '@chakra-ui/icons';

import { Flex, IconButton, UnorderedList } from '@chakra-ui/react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/DiaryLists/Header';
import MainContent from '../../components/UI/MainContent';
import HamburgerMenu from '../UI/HamburgerMenu';
import CurrentDay from './CurrentDay';
import CurrnetMain from './CurrentMain';
import YearFilter from './YearFilter';

const CurrentDiary = ({ thisDiary, thisParam }) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate('/');
  };

  // console.log(thisDiary);

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const yearChangeHandler = year => {
    setSelectedYear(year);
  };

  // 선택된 연도로 필터된 일기
  const filteredDiaries =
    thisDiary.pages &&
    thisDiary.pages.filter(item => {
      if (item.date.getFullYear() === selectedYear) {
        return item;
      }
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
        rightContent={<HamburgerMenu />}
      />
      <MainContent w={'100%'}>
        <Flex w={'auto'} flexDir={'column'}>
          <CurrnetMain thisDiary={thisDiary}></CurrnetMain>
          <YearFilter
            data={thisDiary.pages}
            selected={selectedYear}
            onSelectYear={yearChangeHandler}
          ></YearFilter>
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
                      date={item.date}
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
