import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import 'firebase/compat/auth';
import {
  Box,
  Center,
  ChakraProvider,
  Flex,
  Heading,
  Image,
  Text,
  theme,
} from '@chakra-ui/react';
import MainContainer from '../components/UI/MainContainer';
import Header from '../components/DiaryLists/Header';
import MainContent from '../components/UI/MainContent';
import { useNavigate } from 'react-router-dom';
import styles from '../components/UI/animation.module.css';

// firebase
import { ref, set } from '@firebase/database';
import Card from '../components/UI/Card';
import Bubble from '../components/UI/Bubble';

const Login = ({ db }) => {
  const navigate = useNavigate();

  let content;

  //firebase ui
  const uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: '/signedIn',
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },
  };

  // 로그인정보
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      setIsSignedIn(!!user);

      if (!!user) {
        // db에 유저데이터 저장
        set(ref(db, 'users/' + user.uid), {
          id: user.uid,
          name: user._delegate.displayName,
          email: user._delegate.email,
          indexOn: [],
        });

        navigate('/');
      }
    });

    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  if (!isSignedIn) {
    content = (
      <Center h={['100%']}>
        <Card
          w={['100%', '100%', '600px']}
          h={['100%', '100%', 'auto']}
          p={[10]}
          display={'flex'}
        >
          <Center flexDir={'column'}>
            <Heading
              fontSize={[42]}
              fontFamily={'NeoDunggeunmo'}
              color={'orange.800'}
              mb={30}
            >
              로그인!
            </Heading>
            <Bubble>
              <Flex flexDir={'column'} w={'100%'} alignItems={'center'}>
                <Text fontWeight={'light'} color={'whiteAlpha.800'}>
                  절대.
                  <a
                    target="_blank"
                    className="horror_link"
                    href="https://www.youtube.com/watch?v=OzVfxafNCZg&t=158s"
                  >
                    위험한곳
                  </a>
                  아닙니<br></br>다믿어주세요... 전유
                  <br></br>
                  령입니다
                </Text>
              </Flex>
            </Bubble>
            <Image
              mt={'2rem'}
              mb={'1rem'}
              className={styles['slide-top']}
              w={['auto']}
              src="https://user-images.githubusercontent.com/100299692/164914118-9de82616-bb29-40e3-89eb-220f5a76fd84.png"
              fallbackSrc="https://via.placeholder.com/200"
            />
          </Center>
          <Flex flexDir={'column'}>
            <StyledFirebaseAuth
              uiConfig={uiConfig}
              firebaseAuth={firebase.auth()}
            />
          </Flex>
        </Card>
      </Center>
    );
  }

  return (
    <ChakraProvider h={'100%'} theme={theme}>
      <MainContainer>
        <Header />
        <MainContent>{content}</MainContent>
      </MainContainer>
    </ChakraProvider>
  );
};

export default Login;
