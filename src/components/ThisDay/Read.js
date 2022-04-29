import React, { useEffect, useState } from 'react';

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Text,
  Textarea,
  useDisclosure,
  useMenuState,
  useStyles,
  useToast,
} from '@chakra-ui/react';
import Header from '../DiaryLists/Header';
import Card from '../UI/Card';
import MainContainer from '../UI/MainContainer';
import MainContent from '../UI/MainContent';
import { ArrowBackIcon } from '@chakra-ui/icons';

import { useLocation, useNavigate } from 'react-router-dom';
import MessageModal from '../UI/MessageModal';

// firebase
import {
  ref,
  update,
  getDatabase,
  set,
  get,
  query,
  orderByChild,
  equalTo,
} from '@firebase/database';
import Bubble from '../UI/Bubble';

const Read = ({ onBack, changeMode, deleteData, db }) => {
  const weekArr = ['일', '월', '화', '수', '목', '금', '토'];

  const imgSrc = [
    'https://user-images.githubusercontent.com/100299692/165281611-90f31def-287e-46d4-b948-5b3c20113c02.png',
    'https://user-images.githubusercontent.com/100299692/165281598-4a5e2033-3f7a-4115-9347-64cf2ec88893.png',
    'https://user-images.githubusercontent.com/100299692/165281610-36e390a4-fab3-4146-a83c-4ccaf3c39b01.png',
    'https://user-images.githubusercontent.com/100299692/165281613-955ce4e2-fbfc-4d23-abf5-dda3e3bb0e34.png',
  ];

  const cancelRef = React.useRef();

  const location = useLocation();
  const navigate = useNavigate();

  const pageId = location.pathname.split('/')[3];

  const diaryId = location.pathname.split('/')[2];

  const goToupdatePage = () => {
    navigate(`/diary/${diaryId}/${pageId}/update/`);
    changeMode(`update`);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [thisPage, setThisPage] = useState();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    // 파라미터의 pageId를 기반으로 표기할 데이터를 찾음
    const findById = await get(
      query(ref(db, 'pages'), orderByChild('id'), equalTo(pageId))
    );
    // db에 존재하는 패이지인지 확인
    // 없을시 404
    if (findById.val() === null) {
      navigate('/error');
      return;
    } else {
      setThisPage(Object.values(findById.val())[0]);
    }
    setIsLoading(false);
  }, []);

  const date = thisPage ? new Date(thisPage.date) : new Date();

  const deletePage = () => {
    deleteData(thisPage);

    toast({
      title: '성공!',
      description: '이 페이지를 찢어버렸어요!😏',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <MainContainer>
      {/* 헤더 */}
      <Header
        title={
          <Skeleton
            isLoaded={!isLoading}
            startColor={'whiteAlpha.300'}
            endColor="orange.500"
            isTruncated
            maxW={['250px', '310px', '640px']}
          >
            {thisPage && thisPage.title}
          </Skeleton>
        }
        leftContent={
          <IconButton
            colorScheme={'orange'}
            bg={'transparent'}
            aria-label="back-btn"
            icon={<ArrowBackIcon boxSize="5" onClick={onBack} />}
          />
        }
      />

      {/* 메인컨텐츠 */}
      <MainContent>
        <Card w={'100%'} h={'100%'}>
          <Box w={'100%'}>
            <Center textAlign={'center'} flexDir={'column'}>
              <Skeleton isLoaded={!isLoading}>
                <Button
                  colorScheme={'white'}
                  bg={'transparent'}
                  color={'orange.700'}
                  className="example-custom-input"
                  _hover={{
                    bg: 'orange.100',
                  }}
                >
                  {' '}
                  {`${date.getFullYear()}년 ${
                    date.getMonth() + 1
                  }월 ${date.getDate()}일 ${weekArr[date.getDay()]}요일`}
                </Button>
              </Skeleton>

              {/* 기분 */}
              <Skeleton isLoaded={!isLoading}>
                <Box>
                  <Image src={imgSrc[0]} w="50px"></Image>
                </Box>
              </Skeleton>
              {/* 페이지제목 */}
              <Skeleton
                w={'100%'}
                px={3}
                height={'24px'}
                isLoaded={!isLoading}
                m={3}
              >
                <Heading
                  id="title"
                  fontSize={'lg'}
                  alignItems={'center'}
                  justifyContent={'center'}
                >
                  <Text noOfLines={1}>{thisPage && thisPage.title}</Text>
                </Heading>
              </Skeleton>

              {/* 내용 */}

              {isLoading ? (
                <Box m={3} w={'100%'} h={`calc(100vh - 314px)`} bg="orange.50">
                  <SkeletonText h={'100%'} noOfLines={5} spacing="4" />
                </Box>
              ) : (
                <Box
                  m={3}
                  w={'100%'}
                  className="content"
                  id="content"
                  type="text"
                  // bg={'white'}
                  px={3}
                  h={`calc(100vh - 314px)`}
                  whiteSpace="pre-wrap"
                  textAlign={'left'}
                  overflowY={'scroll'}
                  sx={{
                    '&::-webkit-scrollbar': {
                      width: '8px',
                      backgroundColor: `rgba(0, 0, 0, 0.05)`,
                      overflow: 'hidden',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      backgroundColor: `rgba(0, 0, 0, 0.05)`,
                    },
                  }}
                >
                  {thisPage && thisPage.content}
                </Box>
              )}

              <Flex>
                <Button
                  mt={['6', '6', '3']}
                  type="submit"
                  form="addDiaryForm"
                  w={['100%', '100%', '100px']}
                  colorScheme="orange"
                  onClick={goToupdatePage}
                  mr={3}
                >
                  수정
                </Button>

                <Button
                  mt={['6', '6', '3']}
                  type="submit"
                  form="addDiaryForm"
                  w={['100%', '100%', '100px']}
                  colorScheme="orange"
                  // onClick={deleteData}
                  onClick={onOpen}
                >
                  삭제
                </Button>
              </Flex>
            </Center>
          </Box>
        </Card>

        <>
          <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  정말 일기를 지울까요?
                </AlertDialogHeader>

                <AlertDialogBody>지운 일기는 복구되지 않아요</AlertDialogBody>

                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose}>
                    역시 그만두기
                  </Button>
                  <Button colorScheme="red" onClick={deletePage} ml={3}>
                    지우기
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </>
      </MainContent>
    </MainContainer>
  );
};

export default Read;
