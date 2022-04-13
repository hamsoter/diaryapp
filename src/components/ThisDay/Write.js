import { ArrowBackIcon } from '@chakra-ui/icons';

import {
  Button,
  Center,
  FormControl,
  IconButton,
  Input,
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

const Write = ({ onBack, writer, saveData, data, diaries }) => {
  const [startDate, setStartDate] = useState(new Date());

  console.log(data);

  // 모달 상태 관리
  const { isOpen, onOpen, onClose } = useDisclosure();

  // form의 validation을 확인하는 메서드
  const validator = (values, actions) => {
    let errors = {};

    const { content, title, date } = values;

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
      writer: '',
      title: '',
      content: '',
      writer: writer,
      // 차후 추가
      mood: 0,
      date: startDate,
    },

    // 서브밋시
    onSubmit: (values, action) => {
      values.id = Math.random().toString(36).substring(2, 8);
      values.date = startDate;

      // console.log(values);

      saveData(values, diaries);
    },
    // 값 변경시마다 유효성체크
    validateOnChange: false,
    // 인풋창 블러시마다 유효성체크
    validateOnBlur: true,
    validate: validator,
  });

  useEffect(() => {
    if (data != undefined) {
      formik.values.content = data.content;
      formik.values.title = data.title;

      setStartDate(new Date(data.date));
    }
  }, []);

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
        <Card w={'100%'} h={'100%'}>
          <FormControl
            id="addDiaryForm"
            onSubmit={formik.handleSubmit}
            // isInvalid={formik.errors.title || formik.errors.content}
          >
            <Center textAlign={'center'} flexDir={'column'}>
              <DatePick
                setStartDate={setStartDate}
                startDate={startDate}
              ></DatePick>
              <Input
                id="title"
                onChange={formik.handleChange}
                value={formik.values.title}
                type="text"
                size={'lg'}
                bg={'white'}
                placeholder={'일기 제목'}
                mb={3}
              />
              <Textarea
                className="content"
                id="content"
                onChange={formik.handleChange}
                value={formik.values.content}
                type="text"
                bg={'white'}
                p={3}
                placeholder="무슨 일이 있었나요?"
                h={`calc(100vh - 276px)`}
                resize={'none'}
              />

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
        <MessageModal
          title={'잠시만요 Σ(°ロ°)'}
          content={'제목과 내용을 제대로 기입해주세요.'}
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
        ></MessageModal>
      </MainContent>
    </MainContainer>
  );
};

export default Write;
