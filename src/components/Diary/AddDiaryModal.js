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
} from '@chakra-ui/react';
import ColorPicker from '../UI/ColorPicker';
import { useFormik } from 'formik';

const AddDiaryModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // const [newDiaryData, setNewDiaryData] = useControllableState({
  //   defaultValue: {
  //     name: '',
  //     id: '',
  //     title: '',
  //   },
  // });

  const [selectedColor, setSelectedColor] = useControllableState({
    defaultValue: '#FF6900',
  });
  // const nameInputRef = useRef();
  // const titleInputRef = useRef();

  const formik = useFormik({
    initialValues: {
      id: Math.random().toString(),
      userName: '',
      title: '',
      color: selectedColor,
    },
    onSubmit: values => {
      console.log(values);
      // 색상값 초기화
      setSelectedColor('#FF6900');
    },
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
            {/* <AddDiaryForm></AddDiaryForm> */}
            <form id="addDiaryForm" onSubmit={formik.handleSubmit}>
              <FormControl>
                <FormLabel htmlFor="userName">당신의 이름</FormLabel>
                <Input
                  id="userName"
                  // ref={nameInputRef}
                  onChange={formik.handleChange}
                  value={formik.values.userName}
                  type="text"
                  colorScheme={'orange'}
                />
                <FormLabel mt={5} htmlFor="title">
                  새 일기장의 이름
                </FormLabel>
                <Input
                  id="title"
                  // ref={titleInputRef}
                  onChange={formik.handleChange}
                  value={formik.values.title}
                  type="text"
                  colorScheme={'orange'}
                />
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
                  onClick={() => {
                    onClose();
                  }}
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
