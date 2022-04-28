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
  IconButton,
  Divider,
} from '@chakra-ui/react';
import AddDiaryForm from './AddDiaryForm';
import { AddIcon } from '@chakra-ui/icons';

const AddDiaryModal = ({ loginUser, onSaveDiary }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getSaveData = data => {
    onSaveDiary(data);
  };

  return (
    <>
      <IconButton
        onClick={onOpen}
        fontSize={['sm', 'sm', 'md']}
        colorScheme="orange"
        variant="solid"
        icon={<AddIcon></AddIcon>}
      ></IconButton>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mx={[3, 0, 0]} w={['100%', '350px', '100%']}>
          <ModalHeader fontSize="lg">새 일기장 추가</ModalHeader>

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
