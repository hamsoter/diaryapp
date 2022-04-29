import {
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Button,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import firebase from 'firebase/compat/app';

import { getAuth } from 'firebase/auth';
import { useState } from 'react';

const LogoutModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  // const toast = useToast();
  const auth = getAuth();

  const onBack = () => {
    navigate(`/`);
  };

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
          <Text mb="1rem">
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
              console.log('logout');
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
