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
  ModalFooter,
  Text,
  Textarea,
  useStyles,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import React from 'react';
import Header from '../DiaryLists/Header';
import Card from '../UI/Card';
import MainContainer from '../UI/MainContainer';
import MainContent from '../UI/MainContent';

//Datepicker
import DatePick from '../UI/DatePick';

const Write = ({ onBack }) => {
  const formik = useFormik({
    // 초기값 설정
    initialValues: {
      id: '',
      title: '',
      content: '',
    },
    onSubmit: (values, action) => {
      values.id = Math.random().toString(36).substring(2, 8);
    },
    // 값 변경시마다 유효성체크
    validateOnChange: true,
    // 인풋창 블러시마다 유효성체크
    validateOnBlur: true,
    // validate: validator,
  });

  // form의 validation을 확인하는 메서드
  const validator = values => {
    let error = {};

    // const { userName, title } = values;

    // if (userName.length < 1) {
    //   error.userName = '이름을 입력하세요';
    // }
    // if (title.length < 1) {
    //   error.title = '일기장 이름을 입력하세요';
    // }

    // console.log(error);
    // 에러 객체가 있을 시 handler이 submit 되지 않음
    return error;
  };

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
          <FormControl id="addDiaryForm" onSubmit={formik.handleSubmit}>
            <Center textAlign={'center'}>
              <DatePick date={new Date()}></DatePick>
            </Center>
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
              onChange={formik.handleChange}
              // value={formik.values}
              type="text"
              bg={'white'}
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
          </FormControl>
        </Card>
      </MainContent>
    </MainContainer>
  );
};

export default Write;
