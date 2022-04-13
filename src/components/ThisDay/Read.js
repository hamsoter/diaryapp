import React from 'react';

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
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
  useMenuState,
  useStyles,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import Header from '../DiaryLists/Header';
import Card from '../UI/Card';
import MainContainer from '../UI/MainContainer';
import MainContent from '../UI/MainContent';
import { ArrowBackIcon } from '@chakra-ui/icons';

import { useLocation, useNavigate } from 'react-router-dom';
import MessageModal from '../UI/MessageModal';

const Read = ({ onBack, data, changeMode, deleteData }) => {
  const weekArr = ['일', '월', '화', '수', '목', '금', '토'];
  const cancelRef = React.useRef();

  const location = useLocation();
  const navigate = useNavigate();

  const date = new Date(data.date);

  const paramId = location.pathname.split('/')[3];

  const diaryId = location.pathname.split('/')[2];

  const goToupdatePage = () => {
    navigate(`/diary/${diaryId}/${paramId}/update/`);
    changeMode(`update`);
  };

  // 모달 상태 관리
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <MainContainer>
      {/* 헤더 */}
      <Header
        title={data.title}
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
              <Button
                colorScheme={'white'}
                bg={'transparent'}
                color={'orange.700'}
                className="example-custom-input"
                mb={3}
                _hover={{
                  bg: 'orange.100',
                }}
              >
                {' '}
                {`${date.getFullYear()}년 ${
                  date.getMonth() + 1
                }월 ${date.getDate()}일 ${weekArr[date.getDay()]}요일`}
              </Button>
              {/* 타이틀 */}
              <Heading
                id="title"
                fontSize={'lg'}
                // bg={'red'}
                w={'100%'}
                h={'48px'}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                mb={3}
              >
                {data.title}
              </Heading>

              {/* 내용 */}
              <Box
                w={'100%'}
                className="content"
                id="content"
                type="text"
                // bg={'white'}
                p={3}
                h={`calc(100vh - 276px)`}
                whiteSpace="pre"
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
                {data.content}
              </Box>

              <Flex>
                <Button
                  mt={['6', '6', '3']}
                  type="submit"
                  form="addDiaryForm"
                  w={['100%', '100%', '100px']}
                  colorScheme="orange"
                  onClick={goToupdatePage}
                  m={3}
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
                  <Button colorScheme="red" onClick={deleteData} ml={3}>
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
