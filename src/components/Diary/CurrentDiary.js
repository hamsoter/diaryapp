import { ArrowBackIcon, EditIcon, HamburgerIcon } from '@chakra-ui/icons';

import {
  Box,
  Button,
  Center,
  ChakraProvider,
  Divider,
  Flex,
  Heading,
  IconButton,
  Image,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tag,
  Text,
  theme,
  UnorderedList,
} from '@chakra-ui/react';
import {
  Link,
  useRoutes,
  useRouteMatch,
  useLocation,
  useHistory,
  useNavigate,
} from 'react-router-dom';
import Header from '../../components/DiaryLists/Header';
import Bubble from '../../components/UI/Bubble';
import MainContent from '../../components/UI/MainContent';
import Card from '../UI/Card';
import HamburgerMenu from '../UI/HamburgerMenu';
import CurrentDay from './CurrentDay';
import CurrnetMain from './CurrentMain';

const CurrentDiary = ({ thisDiary, thisParam }) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate('/');
  };
  console.log(thisDiary);

  return (
    <>
      <Header
        title={thisDiary.title}
        leftContent={
          <IconButton
            colorScheme={'orange'}
            bg={'transparent'}
            aria-label="back-btn"
            icon={<ArrowBackIcon boxSize="5" onClick={goBack} />}
          />
        }
        rightContent={<HamburgerMenu />}
      />
      <MainContent w={'100%'}>
        <Flex w={'auto'} flexDir={'column'}>
          <CurrnetMain thisDiary={thisDiary}></CurrnetMain>
          <UnorderedList ml={0} className={'daily-lists'}>
            {/* list */}
            {thisDiary &&
              thisDiary.pages.map(item => {
                return (
                  <Link to={`/diary/${thisParam}/${item.id}`}>
                    <CurrentDay
                      key={item.id}
                      title={item.title}
                      content={item.content}
                      mood={item.mood}
                      date={item.date}
                    ></CurrentDay>
                  </Link>
                );
              })}
          </UnorderedList>
        </Flex>
      </MainContent>
    </>
  );
};

export default CurrentDiary;
