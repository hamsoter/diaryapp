import { ArrowBackIcon } from '@chakra-ui/icons';

import {
  Box,
  Center,
  Flex,
  Heading,
  IconButton,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/DiaryLists/Header';
import MainContent from '../../components/UI/MainContent';
import CurrentDiaryMenu from '../UI/CurrentDiaryMenu';
import CurrentPages from './CurrentPages';
import CurrnetMain from './CurrentMain';
import YearFilter from './YearFilter';

import { ref, set, update, getDatabase } from '@firebase/database';

const CurrentDiary = ({
  thisDiary,
  thisParam,
  getPages,
  setThisDiary,
  loginUser,
}) => {
  const dbref = ref(getDatabase());
  const navigate = useNavigate();

  const [pagesArr, setPagesArr] = useState();

  const [filteredPages, setFilteredPages] = useState();

  const [isLoading, setIsLoading] = useState(true);

  // 연도별 필터 + 최신순 정렬
  const filterYear = async year => {
    const arr = Object.values(await getPages());
    return arr
      .filter(item => {
        if (new Date(item.date).getFullYear() === year) {
          return item;
        }
      })
      .sort(function (a, b) {
        const aDate = a.date;
        const bDate = b.date;

        return new Date(bDate) - new Date(aDate);
      });
  };

  useEffect(async () => {
    if (await getPages()) {
      setPagesArr(Object.values(await getPages()));

      // 화면에 그려진 필터된 다이어리
      setFilteredPages(await filterYear(selectedYear));
    }
    setIsLoading(false);
  }, []);

  const goBack = () => {
    navigate('/');
  };

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const yearChangeHandler = async year => {
    setSelectedYear(year);
    setFilteredPages(await filterYear(year));
  };

  const deleteThisDiary = () => {
    const updates = {};
    updates['diaries/' + thisDiary.id] = null;

    update(dbref, updates);
    goBack();
  };

  const updateThisDiary = updateInfo => {
    const updateName = {};
    const updateColor = {};

    const newDiary = {};

    setThisDiary({
      id: thisDiary.id,
      owner: {
        name: loginUser.name,
      },
      color: updateInfo.color,
      title: updateInfo.title,

      lastRecord: thisDiary.lastRecord.toString(),
    });

    updateName['diaries/' + thisDiary.id + '/title'] = updateInfo.title;
    updateColor['diaries/' + thisDiary.id + '/color'] = updateInfo.color;

    update(dbref, updateName);
    update(dbref, updateColor);
  };

  return (
    <>
      <Header
        title={
          <Skeleton
            isLoaded={!isLoading}
            isTruncated
            maxW={['250px', '310px', '640px']}
            startColor={'whiteAlpha.300'}
            endColor="orange.500"
          >
            {thisDiary.title}
          </Skeleton>
        }
        leftContent={
          <IconButton
            colorScheme={'orange'}
            bg={'transparent'}
            aria-label="back-btn"
            icon={<ArrowBackIcon boxSize="5" onClick={goBack} />}
          />
        }
        rightContent={
          <CurrentDiaryMenu
            thisDiary={thisDiary}
            isLoading={isLoading}
            loginUser={loginUser}
            updateThisDiary={updateThisDiary}
            deleteThisDiary={deleteThisDiary}
          />
        }
      />
      <MainContent w={'100%'}>
        <Flex w={'auto'} flexDir={'column'}>
          <CurrnetMain
            loginUser={loginUser}
            isLoading={isLoading}
            thisDiary={thisDiary}
          ></CurrnetMain>
          <YearFilter
            isLoading={isLoading}
            data={pagesArr}
            selected={selectedYear}
            onSelectYear={yearChangeHandler}
          ></YearFilter>

          <UnorderedList ml={0} className={'daily-lists'}>
            {isLoading ? (
              <>
                <Box padding="6" mb={3} boxShadow="lg" bg="orange.50">
                  <SkeletonCircle size="20" />
                  <SkeletonText
                    mt={['21px', '17px', '6']}
                    noOfLines={[1, 2, 3]}
                    spacing={['5']}
                  />
                </Box>
                <Box padding="6" boxShadow="lg" bg="orange.50">
                  <SkeletonCircle size="20" />
                  <SkeletonText h={'72px'} mt="4" noOfLines={3} spacing="4" />
                </Box>
              </>
            ) : (
              filteredPages &&
              filteredPages.map(item => {
                return (
                  <Box ml={0} key={item.id}>
                    <Link to={`/diary/${thisParam}/${item.id}/read`}>
                      <CurrentPages
                        title={item.title}
                        content={item.content}
                        mood={item.mood}
                        date={new Date(item.date)}
                      ></CurrentPages>
                    </Link>
                  </Box>
                );
              })
            )}
            {/* list */}
            {}
          </UnorderedList>

          {!filteredPages && !isLoading && (
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
                  너무 춥고 쓸쓸해요...🍃<br></br> 뭐라도 써보는 건 어떨까요?
                </Text>
              </Box>
            </Center>
          )}
        </Flex>
      </MainContent>
    </>
  );
};

export default CurrentDiary;
