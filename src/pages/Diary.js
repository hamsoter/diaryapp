import {
  AddIcon,
  ArrowBackIcon,
  EditIcon,
  HamburgerIcon,
  LinkIcon,
} from '@chakra-ui/icons';

import {
  baseStyle,
  Box,
  Button,
  Center,
  ChakraProvider,
  Container,
  Divider,
  extendTheme,
  Flex,
  Heading,
  IconButton,
  Image,
  Img,
  List,
  ListItem,
  Spacer,
  Tag,
  Text,
  theme,
  UnorderedList,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import Header from '../components/DiaryLists/Header';
import Bubble from '../components/UI/Bubble';
import Card from '../components/UI/Card';
import customColorTheme from '../components/UI/CustomColorTheme';
import MainContainer from '../components/UI/MainContainer';
import MainContent from '../components/UI/MainContent';
import MainContents from '../components/UI/MainContents';
import NotFound from '../components/UI/NotFound';

const Diary = props => {
  const { colors } = customColorTheme;
  // App에서 다이어리 배열을 임시로 받아옴.
  const diaries = props.getTempDiaries();

  // 찾아낸 다이어리를 저장할 공간
  const [thisDiary, setThisDiary] = useState('');

  // 일기장 존재 여부를 저장할 공간
  const [notFoundFlag, setNotFoundFlag] = useState('false');

  // missing count
  const [missingCount, setMissingCount] = useState(1);

  // 현재 url의 uuid 잘라내기
  const thisParamId = window.location.pathname.split('/')[2];

  const findById = () => {
    const result = diaries.find(item => {
      return item.id == thisParamId;
    });

    // 찾은 객체 리턴
    return result;
  };

  // 렌더 무한루프 방지 순서 처리
  // 주소 유효값 검사
  useEffect(() => {
    if (findById()) {
      setThisDiary(findById());

      console.log(thisDiary.color);
    } else {
      // url의 uuid 값을 찾지 못할 경우
      setNotFoundFlag(false);
    }
    // 에러페이지 방문자수 카운트
    if (notFoundFlag) {
      setMissingCount(prevCount => prevCount + 1);
    }
  });

  let content = (
    <>
      <Header
        title={thisDiary.title}
        leftContent={
          <IconButton
            colorScheme={'orange'}
            bg={'transparent'}
            aria-label="back-btn"
            icon={<ArrowBackIcon boxSize="5" />}
          />
        }
        rightContent={
          <IconButton
            colorScheme={'orange'}
            bg={'transparent'}
            aria-label="ham-btn"
            icon={<HamburgerIcon boxSize="5" />}
          />
        }
      />
      <MainContent w={'100%'} colorScheme={thisDiary.color}>
        <Flex w={'auto'} flexDir={'column'}>
          <Box
            // className="sjsi"
            display={'flex'}
            alignItems={'center'}
            flexDir={'column'}
            bg={'#fffaf0a6'}
            borderRadius={2}
            py={10}
            mb={1}
            px={5}
          >
            <Bubble>
              <Flex flexDir={'column'} w={'100%'} alignItems={'center'}>
                <Heading fontSize={['xl']} color="whiteAlpha.900">
                  안녕하세요 {thisDiary.userName}
                </Heading>
                <Text fontSize={'nm'} color="whiteAlpha.900">
                  일기쓰기 좋은 날이네요!
                </Text>
              </Flex>
            </Bubble>
            <Image
              w={'150px'}
              src="https://user-images.githubusercontent.com/100299692/159457218-7faee460-a25a-4170-bfc9-54bd613abf0d.png"
              fallbackSrc="https://via.placeholder.com/150"
              m={'5'}
            ></Image>

            {/* 액션버튼 */}
            <Box displat={'flex'} width={'100%'} className="action-btns">
              <Flex width={'100%'}>
                <Button
                  w={'100%'}
                  size={'lg'}
                  colorScheme={'blackAlpha'}
                  aria-label="Send email"
                  variant="solid"
                >
                  일기 쓰기
                  <EditIcon ml={2}></EditIcon>
                </Button>
              </Flex>
            </Box>
          </Box>

          <UnorderedList ml={0} className={'daily-lists'}>
            <List my={2}>
              <Box
                display={'flex'}
                boxShadow={'xs'}
                className="daily"
                bg={'orange.50'}
                alignItems={'center'}
                borderRadius={'5'}
                overflow={'hidden'}
                px={[0, 0, 5]}
              >
                <Flex
                  m={[5, 5, 10]}
                  w={['70px', '80px', 100]}
                  flexShrink={0}
                  flexDir={'column'}
                  wrap={'wrap'}
                >
                  <Image
                    src="https://user-images.githubusercontent.com/100299692/159513668-9d668b5d-3377-45cb-9363-8a9a7727c9c4.png"
                    fallbackSrc="https://via.placeholder.com/130"
                    mb={3}
                  />
                  <Center>
                    <Tag
                      colorScheme={'green'}
                      display={'flex'}
                      alignItems={'center'}
                      fontSize={['xs', 'sm', 'md']}
                    >
                      03/22 화
                    </Tag>
                  </Center>
                </Flex>
                {/* 데일리 */}
                <Box
                  className="daily-text-content"
                  color="blackAlpha.700"
                  p={[5, 5, 10]}
                >
                  {/* 일기제목 */}
                  <Heading fontSize={['md', 'md', 'lg']} isTruncated mb={2}>
                    오늘은 정말 즐거웠거든요!
                  </Heading>
                  <Text noOfLines={[1, 2, 3]} fontSize={['sm', 'sm', 'md']}>
                    무진장 재밌는 하루였다! 무진장 재밌는 하루였다! 무진장
                    재밌는 하루였다! 무진장 재밌는 하루였다! 무진장 재밌는
                    하루였다! 무진장 재밌는 하루였다! 무진장 재밌는 하루였다!
                    무진장 재밌는 하루였다! 무진장 재밌는 하루였다!무진장 재밌는
                    하루였다! 무진장 재밌는 하루였다! 무진장 재밌는 하루였다!
                    무진장 재밌는 하루였다! 무진장 재밌는 하루였다! 무진장
                    재밌는 하루였다! 무진장 재밌는 하루였다! 무진장 재밌는
                    하루였다! 무진장 재밌는 하루였다!
                  </Text>
                </Box>
              </Box>
            </List>

            <List>{/* Box UI Component */}</List>
          </UnorderedList>
        </Flex>
      </MainContent>
    </>
  );

  // 존재하지 않는 주소로 들어갔을 때 컨텐츠 내용 변경
  if (!notFoundFlag) {
    content = (
      <>
        <Header title={' 미아 발견! '} />
        <NotFound missingCount={missingCount} />
      </>
    );
  }

  return (
    <ChakraProvider h={'100%'} theme={theme}>
      <MainContainer>{content}</MainContainer>
    </ChakraProvider>
  );
};

export default Diary;
