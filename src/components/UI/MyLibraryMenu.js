import React from 'react';
import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  List,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const MyLibraryMenu = () => {
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
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader mb={4}></DrawerHeader>

          <DrawerBody>
            <List
              w={'100%'}
              _hover={{ bg: 'rgb(243,243,243,1)' }}
              p={[4, 4, 6]}
            >
              <Link to="/mypage">
                <Text>설정</Text>
              </Link>
            </List>
            <Divider></Divider>
            <List
              w={'100%'}
              opacity={0.1}
              _hover={{ bg: 'gray' }}
              p={[4, 4, 6]}
            >
              <Link to="/kawaighostchan">
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
