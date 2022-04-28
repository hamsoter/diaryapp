import { ChevronRightIcon } from '@chakra-ui/icons';
import { Divider, ListIcon, ListItem, UnorderedList } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const MyPageList = () => {
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
        <Link to="logout">
          <ListItem
            display={'flex'}
            alignItems={'center'}
            bg={'orange.50'}
            p={[5, 5, 6]}
            fontSize={['md', 'md', 'lg']}
            justifyContent={'space-between'}
          >
            로그아웃
            <ChevronRightIcon></ChevronRightIcon>
          </ListItem>
        </Link>
        <Divider></Divider>
        <Link to="signout">
          <ListItem
            display={'flex'}
            alignItems={'center'}
            bg={'orange.50'}
            p={[5, 5, 6]}
            fontSize={['md', 'md', 'lg']}
            justifyContent={'space-between'}
          >
            회원 탈퇴
            <ChevronRightIcon></ChevronRightIcon>
          </ListItem>
        </Link>
        <Divider></Divider>
      </UnorderedList>
    </>
  );
};

export default MyPageList;
