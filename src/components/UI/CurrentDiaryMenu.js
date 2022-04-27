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
  Skeleton,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import React from 'react';
import UpdateModalOverlay from './UpdateModalOverlay';

const CurrentDiaryMenu = ({
  deleteThisDiary,
  updateThisDiary,
  thisDiary,
  isLoading,
}) => {
  // 모달 상태 관리
  const { isOpen, onOpen, onClose } = useDisclosure();

  // 알림창 관리
  const toast = useToast();

  const DeleteOverlay = () => {
    return (
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            정말로요?
          </AlertDialogHeader>

          <AlertDialogBody>
            다이어리의 모든 일기가 한꺼번에 지워지며, <br></br>지워진 데이터는
            복구되지 않습니다.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              역시 그만두기
            </Button>
            <Button
              colorScheme="red"
              onClick={() => {
                deleteThisDiary();

                toast({
                  title: '성공!',
                  description: '잘가요! 종이가 흩날립니다...📃',
                  status: 'success',
                  duration: 9000,
                  isClosable: true,
                });
              }}
              ml={3}
            >
              지우기
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    );
  };

  const [overlay, setOverlay] = React.useState(<></>);

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
        <Skeleton isLoaded={!isLoading}>
          <MenuItem
            key={1}
            onClick={() => {
              setOverlay(
                <UpdateModalOverlay
                  onClose={onClose}
                  updateThisDiary={updateThisDiary}
                  thisDiary={thisDiary}
                />
              );
              onOpen();
            }}
            color={'blackAlpha.700'}
          >
            정보수정
          </MenuItem>
        </Skeleton>

        <Skeleton isLoaded={!isLoading}>
          <MenuItem
            key={0}
            onClick={() => {
              setOverlay(<DeleteOverlay />);
              onOpen();
            }}
            color={'red.500'}
          >
            삭제하기
          </MenuItem>
        </Skeleton>
      </MenuList>

      <>
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          {overlay}
        </AlertDialog>
      </>
    </Menu>
  );
};

export default CurrentDiaryMenu;
