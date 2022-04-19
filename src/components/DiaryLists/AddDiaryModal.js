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
  FormHelperText,
  useControllableState,
  Text,
} from '@chakra-ui/react';
import ColorPicker from '../UI/ColorPicker';
import { useFormik } from 'formik';
import AddDiaryForm from './AddDiaryForm';

const AddDiaryModal = ({ loginUser, onSaveDiary }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getSaveData = data => {
    onSaveDiary(data);
  };

  return (
    <>
      <Button
        onClick={onOpen}
        fontSize={['sm', 'sm', 'md']}
        colorScheme="orange"
        variant="solid"
      >
        새 일기장 +
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w={['290px', '350px', '100%']}>
          <ModalHeader>새 일기장 추가</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddDiaryForm
              onClose={onClose}
              loginUser={loginUser}
              onGetData={getSaveData}
            ></AddDiaryForm>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddDiaryModal;
