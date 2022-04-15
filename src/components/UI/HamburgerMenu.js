import { HamburgerIcon } from '@chakra-ui/icons';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';

const HamburgerMenu = ({ deleteThisDiary }) => {
  // 모달 상태 관리
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  return (
    <Menu colorScheme="orange">
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<HamburgerIcon boxSize="5" />}
        colorScheme="orange"
        color={'white'}
        bg="orange.400"
      />
      <MenuList>
        <MenuItem key={0} onClick={onOpen} color={'blackAlpha.700'}>
          삭제하기
        </MenuItem>
      </MenuList>

      <>
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                정말 다이어리를 지울까요?
              </AlertDialogHeader>

              <AlertDialogBody>
                다이어리의 모든 일기가 한꺼번에 지워지며, 지워진 데이터는
                복구되지 않습니다.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  역시 그만두기
                </Button>
                <Button colorScheme="red" onClick={deleteThisDiary} ml={3}>
                  지우기
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    </Menu>
  );
};

export default HamburgerMenu;
