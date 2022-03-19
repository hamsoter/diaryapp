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

const AddDiaryModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const submitHandler = e => {
    console.log('submit');
  };

  // const [selectedColor, setSelectedColor] = useControllableState({
  //   defaultValue: '#FF6900',
  // });

  // const colorChangeHandler = e => {
  //   setSelectedColor(e.hex);
  // };

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
            <FormControl id="addDiaryForm" onSubmit={submitHandler}>
              <FormLabel htmlFor="name">당신의 이름</FormLabel>
              <Input id="name" type="text" colorScheme={'orange'} />
              <FormLabel mt={5} htmlFor="title">
                새 일기장의 이름
              </FormLabel>
              <Input id="title" type="text" colorScheme={'orange'} />
              <FormLabel mt={5}>커버 색상</FormLabel>
              <ColorPicker></ColorPicker>
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
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddDiaryModal;
