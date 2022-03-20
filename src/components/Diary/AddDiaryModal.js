import React, { useRef } from 'react';

import { CirclePicker } from 'react-color';

import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  // 폼
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  useControllableState,
  Text,
} from '@chakra-ui/react';
import ColorPicker from '../UI/ColorPicker';
import { useFormik } from 'formik';

const AddDiaryModal = props => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // form의 validation을 확인하는 메서드
  const validator = values => {
    let error = {};

    const { userName, title } = values;

    if (userName.length < 1) {
      error.userName = '이름을 입력하세요';
    }
    if (title.length < 1) {
      error.title = '일기장 이름을 입력하세요';
    }

    console.log(error);
    // 에러 객체가 있을 시 handler이 submit 되지 않음
    return error;
  };

  const [selectedColor, setSelectedColor] = React.useState('#FF6900');

  const formik = useFormik({
    // 초기값 설정
    initialValues: {
      id: '',
      userName: '',
      title: '',
      color: selectedColor,
      // 임시 날짜
      lastRecord: new Date(),
    },
    onSubmit: (values, action) => {
      values.id = Math.random().toString();
      values.color = selectedColor;
      props.onSaveDiary(values);
      action.resetForm();
      onClose();
    },
    // 값 변경시마다 유효성체크
    validateOnChange: true,
    // 인풋창 블러시마다 유효성체크
    validateOnBlur: true,
    validate: validator,
  });

  return (
    <>
      <Button onClick={onOpen} colorScheme="orange" variant="solid">
        새 일기장 +
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w={['290px', '350px', '100%']}>
          <ModalHeader>새 일기장 추가</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* 폼 */}
            <form id="addDiaryForm" onSubmit={formik.handleSubmit}>
              <FormControl>
                <FormLabel htmlFor="userName">당신의 이름</FormLabel>
                <Input
                  id="userName"
                  onChange={formik.handleChange}
                  value={formik.values.userName}
                  type="text"
                  colorScheme={'orange'}
                />
                <Text fontSize={'sm'} color={'red.400'}>
                  {formik.errors.userName}
                </Text>
                <FormLabel mt={5} htmlFor="title">
                  새 일기장의 이름
                </FormLabel>
                <Input
                  id="title"
                  onChange={formik.handleChange}
                  value={formik.values.title}
                  type="text"
                  colorScheme={'orange'}
                />
                <Text fontSize={'sm'} color={'red.400'}>
                  {formik.errors.title}
                </Text>
                <FormLabel mt={5}>커버 색상</FormLabel>
                <ColorPicker
                  onGetSelectedColor={selectedColor}
                  onSetSelectedColor={setSelectedColor}
                ></ColorPicker>
              </FormControl>

              <ModalFooter px={0}>
                <Button
                  mt={5}
                  type="submit"
                  form="addDiaryForm"
                  w={['100%', '100%', '100px']}
                  colorScheme="orange"
                  onClick={formik.handleSubmit}
                >
                  추가
                </Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddDiaryModal;
