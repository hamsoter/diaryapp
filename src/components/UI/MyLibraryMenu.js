import React from 'react';
import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  List,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Skeleton,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const MyLibraryMenu = ({ isLoading }) => {
  // 모달 상태 관리
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      {/* <Button
        as={IconButton}
        aria-label="Options"
        icon={<HamburgerIcon boxSize="5" />}
        colorScheme="orange"
        color={'white'}
        bg="orange.400"
        fontSize={'nm'}
        onClick={isOpen}
      /> */}
      <IconButton
        icon={<HamburgerIcon boxSize="5" />}
        ref={btnRef}
        colorScheme="orange"
        color={'white'}
        bg="orange.400"
        onClick={onOpen}
      >
        Open
      </IconButton>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader mb={4}></DrawerHeader>

          <DrawerBody>
            <List w={'100%'} _hover={{ bg: 'rgb(243,243,243,1)' }} p={3}>
              <Link to="/mypage">
                <Text>내 정보 수정</Text>
              </Link>
            </List>
            <Divider></Divider>
            <List w={'100%'} opacity={0.1} _hover={{ bg: 'gray' }} p={3}>
              <Link to="/">
                <Text>👻👻👻</Text>
              </Link>
            </List>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MyLibraryMenu;
