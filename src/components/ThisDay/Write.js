import { ArrowBackIcon } from '@chakra-ui/icons';

import {
  Box,
  Button,
  Center,
  FormControl,
  IconButton,
  Input,
  Skeleton,
  SkeletonText,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import React, { useState, useEffect } from 'react';
import Header from '../DiaryLists/Header';
import Card from '../UI/Card';
import MainContainer from '../UI/MainContainer';
import MainContent from '../UI/MainContent';

//Datepicker
import DatePick from '../UI/DatePick';
import MessageModal from '../UI/MessageModal';

// firebase
import { ref, get, query, orderByChild, equalTo } from '@firebase/database';
import { useLocation, useNavigate } from 'react-router-dom';
import MoodSelector from './MoodSelector';

const Write = ({ onBack, writer, saveData, mode, db }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(true);

  const [startDate, setStartDate] = useState(new Date());

  const [mood, setMood] = useState(0);

  const pageId = location.pathname.split('/')[3];

  const { isOpen, onOpen } = useDisclosure();
  // form의 validation을 확인하는 메서드
  const validator = values => {
    let errors = {};

    const { content, title } = values;

    if (content.length < 1) {
      errors.content = '내용은 필수입니다!';
      onOpen();
    }
    if (title.length < 1) {
      errors.title = '제목은 필수입니다!';
      onOpen();
    }

    return errors;
  };

  const formik = useFormik({
    // 초기값 설정
    initialValues: {
      id: '',
      title: '',
      content: '',
      writer: writer,
      // 차후 추가
      mood: mood,
      date: startDate,
    },

    // 서브밋시
    onSubmit: values => {
      values.id = Math.random().toString(36).substring(2, 8);
      values.date = startDate;
      values.mood = mood;

      saveData(values, pageId);
    },
    // 값 변경시마다 유효성체크
    validateOnChange: false,
    // 인풋창 블러시마다 유효성체크
    validateOnBlur: true,
    validate: validator,
  });

  useEffect(() => {
    const fecthData = async () => {
      const findById = await get(
        query(ref(db, 'pages'), orderByChild('id'), equalTo(pageId))
      );

      // db에 존재하는 패이지인지 확인
      // 없을시 404
      if (findById.val() !== null) {
        const valData = Object.values(await findById.val())[0];
        formik.values.content = valData.content;
        formik.values.title = valData.title;

        setMood(valData.mood);
        setStartDate(new Date(valData.date));
      } else {
        navigate('/error');
        return;
      }
    };

    if (mode === 'update') {
      fecthData();
    }
    setIsLoading(false);
  }, [db, mode, navigate, pageId, formik.values]);

  return (
    <MainContainer>
      {/* 헤더 */}
      <Header
        title={'일기작성'}
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
        <Card w={'100%'}>
          <FormControl
            id="addDiaryForm"
            onSubmit={formik.handleSubmit}
            // isInvalid={formik.errors.title || formik.errors.content}
          >
            <Center textAlign={'center'} flexDir={'column'}>
              <Skeleton isLoaded={!isLoading}>
                <DatePick setStartDate={setStartDate} startDate={startDate} />
              </Skeleton>
              <Skeleton w={'100%'} h={'48px'} isLoaded={!isLoading}>
                <Input
                  id="title"
                  onChange={formik.handleChange}
                  value={formik.values.title}
                  type="text"
                  size={'lg'}
                  bg={'white'}
                  placeholder={'일기 제목'}
                />
              </Skeleton>
              {isLoading ? (
                <Box
                  mt={5}
                  w={'100%'}
                  h={`calc(100vh - 442px)`}
                  overflow={'hidden'}
                >
                  <SkeletonText h={'100%'} noOfLines={5} spacing="4" />
                </Box>
              ) : (
                <Textarea
                  className="content-write"
                  overflow={'scroll'}
                  id="content"
                  onChange={formik.handleChange}
                  value={formik.values.content}
                  type="text"
                  bg={'white'}
                  p={3}
                  pr={2}
                  m={3}
                  placeholder="무슨 일이 있었나요?"
                  sx={{
                    '&::-webkit-scrollbar': {
                      width: '12px',
                      backgroundColor: `rgba(0, 0, 0, 0.0)`,
                    },
                    '&::-webkit-scrollbar-thumb': {
                      backgroundColor: `rgba(0, 0, 0, 0.05)`,
                    },
                  }}
                  h={[
                    `calc(100vh - 446px)`,
                    `calc(100vh - 446px)`,
                    `calc(100vh - 469px)`,
                  ]} // 436
                  minHeight={'300px'}
                  resize={'none'}
                />
              )}

              <MoodSelector setMood={setMood} mood={mood}></MoodSelector>
              <Button
                mt={['6', '6', '3']}
                type="submit"
                form="addDiaryForm"
                w={['100%', '100%', '100px']}
                colorScheme="orange"
                onClick={formik.handleSubmit}
              >
                완료
              </Button>
            </Center>
          </FormControl>
        </Card>
        <MessageModal isOpen={isOpen} onOpen={onOpen}></MessageModal>
      </MainContent>
    </MainContainer>
  );
};

export default Write;
