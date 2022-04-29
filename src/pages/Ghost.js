import {
  Button,
  ChakraProvider,
  Heading,
  IconButton,
  Img,
  Text,
  theme,
} from '@chakra-ui/react';

import styles from '../components/UI/neontext.module.css';

import Header from '../components/DiaryLists/Header';
import MainContainer from '../components/UI/MainContainer';
import MainContent from '../components/UI/MainContent';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import Card from '../components/UI/Card';

const Ghost = () => {
  const navigate = useNavigate();

  const onBack = () => {
    navigate('/');
  };

  return (
    <ChakraProvider h={'100%'} theme={theme}>
      <MainContainer>
        <Header
          title={'⊂(・﹏・⊂)'}
          leftContent={
            <IconButton
              colorScheme={'teal'}
              bg={'transparent'}
              aria-label="back-btn"
              icon={<ArrowBackIcon boxSize="5" onClick={onBack} />}
            />
          }
        />
        <MainContent>
          <Card
            w={'100%'}
            h={'100%'}
            bgGradient="linear(to-t, #151520, teal.900)"
            color={'white'}
          >
            <Heading
              color={'white'}
              fontWeight="normal"
              fontFamily={'NeoDunggeunmo'}
              mt={10}
              size={'2xl'}
              className={styles.neonText}
            >
              Ghost!<br></br>
            </Heading>
            <Text opacity={0.5}>
              여긴 그냥 아무 것도 아닌 곳이에요. <br></br>그냥 좀 쉬다가세요!
            </Text>
            <Img
              mt={5}
              src="https://user-images.githubusercontent.com/100299692/165944572-fc841233-b3fe-4837-a433-90f29a45ebb0.png"
            ></Img>

            <Text opacity={0.2} fontSize={'sm'}>
              TMI: 사실은 로그인 페이지에 <br></br>작은 이스터에그가 있어요
            </Text>
          </Card>
        </MainContent>
      </MainContainer>
    </ChakraProvider>
  );
};

export default Ghost;
