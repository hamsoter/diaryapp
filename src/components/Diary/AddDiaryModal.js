import React, { useRef } from 'react';
import AddDiaryForm from './AddDiaryForm';

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
} from '@chakra-ui/react';

const AddDiaryModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const submitHandler = () => {
    console.log();
  };

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

            <FormControl id="addDiaryForm">
              <FormLabel htmlFor="email">
                새 일기장의 이름을 입력하세요.
              </FormLabel>
              <Input id="title" type="text" colorScheme={'orange'} />
              <FormHelperText>중복 이름은 허용되지 않습니다.</FormHelperText>
            </FormControl>

            <ModalFooter px={0}>
              <Button
                type="submit"
                form="addDiaryForm"
                w={['100%', '100%', '100px']}
                colorScheme="orange"
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
