import React from 'react';

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';

const MessageModal = ({ title, content, btnText, onClose, isOpen, onOpen }) => {
  return (
    <Modal size={'xs'} onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>잠시만요 Σ(°ロ°)</ModalHeader>
        <ModalBody>제목과 내용을 제대로 기입해주세요.</ModalBody>
        <ModalFooter>
          <Button
            w={['100%', '100%', 20]}
            colorScheme={'orange'}
            onClick={onClose}
          >
            녜
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MessageModal;
