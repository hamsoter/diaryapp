import { ArrowBackIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Center,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
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
import React, { useState, useEffect } from 'react';
import Header from '../DiaryLists/Header';
import Card from '../UI/Card';
import MainContainer from '../UI/MainContainer';
import MainContent from '../UI/MainContent';

//Datepicker
import DatePick from '../UI/DatePick';
import ErrorModal from '../UI/ErrorModal';

const Write = ({ onBack, writer, saveData, data, mode }) => {
  const [startDate, setStartDate] = useState(new Date());

  // const [updateData, setUpdateData] = useState(data);

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

      console.log(values);

      saveData(values);
    },
    // 값 변경시마다 유효성체크
    validateOnChange: false,
    // 인풋창 블러시마다 유효성체크
    validateOnBlur: true,
    validate: validator,
  });

  const openHandler = props => {
    props();
  };

  useEffect(() => {
    if (data != undefined) {
      formik.values.content = data.content;
      formik.values.title = data.title;

      setStartDate(data.date);
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
        <ErrorModal
          title={'잠시만요 Σ(°ロ°)'}
          content={'제목과 내용을 제대로 기입해주세요.'}
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
        ></ErrorModal>
      </MainContent>
    </MainContainer>
  );
};

export default Write;
