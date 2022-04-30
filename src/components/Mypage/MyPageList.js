import { ChevronRightIcon } from '@chakra-ui/icons';
import {
  Divider,
  ListItem,
  Modal,
  UnorderedList,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import LogoutModal from '../UI/LogoutModal';
import SignOutModal from '../UI/SignOutModal';

const MyPageList = ({ loginUser, db, setLoginUser }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [overlay, setOverlay] = useState();

  return (
    <>
      <UnorderedList listStyleType={'none'} m={0}>
        <Link to="rename">
          <ListItem
            display={'flex'}
            alignItems={'center'}
            bg={'orange.50'}
            p={[5, 5, 6]}
            fontSize={['md', 'md', 'lg']}
            justifyContent={'space-between'}
          >
            이름 변경
            <ChevronRightIcon></ChevronRightIcon>
          </ListItem>
        </Link>
        <Divider></Divider>
        <ListItem
          as={'button'}
          w={'100%'}
          display={'flex'}
          alignItems={'center'}
          bg={'orange.50'}
          p={[5, 5, 6]}
          fontSize={['md', 'md', 'lg']}
          justifyContent={'space-between'}
          onClick={() => {
            setOverlay(
              <LogoutModal
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
              ></LogoutModal>
            );
            onOpen();
          }}
        >
          로그아웃
          <ChevronRightIcon></ChevronRightIcon>
        </ListItem>
        <Divider></Divider>
        <ListItem
          as={'button'}
          w={'100%'}
          display={'flex'}
          alignItems={'center'}
          bg={'orange.50'}
          p={[5, 5, 6]}
          fontSize={['md', 'md', 'lg']}
          justifyContent={'space-between'}
          onClick={() => {
            setOverlay(
              <SignOutModal
                isOpen={isOpen}
                loginUser={loginUser}
                onOpen={onOpen}
                onClose={onClose}
                db={db}
                setLoginUser={setLoginUser}
              ></SignOutModal>
            );
            onOpen();
          }}
        >
          회원 탈퇴
          <ChevronRightIcon></ChevronRightIcon>
        </ListItem>
        <Divider></Divider>
      </UnorderedList>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        {overlay}
      </Modal>
    </>
  );
};

export default MyPageList;
