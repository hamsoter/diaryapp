import {
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Button,
} from '@chakra-ui/react';

import firebase from 'firebase/compat/app';

import { useState } from 'react';

const LogoutModal = ({ onClose }) => {
  const [signOutFlag, setSignOutFlag] = useState(false);

  if (signOutFlag) {
    firebase.auth().signOut();
  }

  const logout = () => {
    setSignOutFlag(true);
  };

  return (
    <>
      <ModalOverlay />
      <ModalContent mx={[3, 0, 0]} w={['100%', '350px', '100%']}>
        <ModalHeader>정말 로그아웃할까요?</ModalHeader>
        <ModalBody>
          <Text mb="1rem" fontSize={'16px'}>
            언제든지 다시 로그인해서 <br></br>
            일기를 쓰고 읽을 수 있답니다.
          </Text>
        </ModalBody>

        <ModalFooter display={'flex'} flexWrap="wrap" gap={2}>
          <Button
            w={'100%'}
            colorScheme="red"
            color={'white'}
            onClick={() => {
              logout();
            }}
          >
            로그아웃
          </Button>
          <Button w={'100%'} onClick={onClose}>
            취소
          </Button>
        </ModalFooter>
      </ModalContent>
    </>
  );
};

export default LogoutModal;
