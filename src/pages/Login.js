import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import 'firebase/compat/auth';
import {
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
import {
  ref,
  set,
  get,
  query,
  orderByChild,
  equalTo,
} from '@firebase/database';
import Card from '../components/UI/Card';
import Bubble from '../components/UI/Bubble';
import useIsMount from '../useIsMount';

const Login = ({ db, setLoginUser }) => {
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

  const isMount = useIsMount();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async user => {
      if (isMount.current) {
        setIsSignedIn(!!user);
      }

      if (!!user) {
        const dbUser = await get(
          query(ref(db, 'users/'), orderByChild('id'), equalTo(user.uid))
        );

        // 로그인 시도시, 이미 db에 있는 유저일 때
        // db에 저장된 닉네임으로 유저를 세팅
        if (dbUser.val() !== null) {
          // db에 유저데이터 저장
          set(ref(db, 'users/' + user.uid), {
            id: user.uid,
            name: Object.values(dbUser.val())[0].name,
            email: user._delegate.email,
          });

          setLoginUser({
            id: user.uid,
            name: Object.values(dbUser.val())[0].name,
            email: user.email,
          });
          // 로그인 시도시, 이미 db에 없는 유저일 때
          // 구글 이름을 세팅
        } else {
          // db에 유저데이터 저장
          set(ref(db, 'users/' + user.uid), {
            id: user.uid,
            name: user._delegate.displayName,
            email: user._delegate.email,
          });

          setLoginUser({
            id: user.uid,
            name: user._delegate.displayName,
            email: user.email,
          });
        }

        navigate('/');
      }
    });

    return () => {
      setIsSignedIn(false);
    }; // Make sure we un-register Firebase observers when the component unmounts.
  }, [db, isMount, navigate, setLoginUser]);

  if (!isSignedIn) {
    content = (
      <Center>
        <Card
          w={'100%'}
          h={['100%', '100%', '100%']}
          py={5}
          px={10}
          display={'flex'}
        >
          <Center flexDir={'column'}>
            <Heading
              fontSize={[42]}
              fontFamily={'NeoDunggeunmo'}
              color={'orange.800'}
              mb={5}
            >
              로그인!
            </Heading>
            <Bubble>
              <Flex flexDir={'column'} w={'100%'} alignItems={'center'}>
                <Text
                  fontWeight={'light'}
                  fontSize="16px"
                  color={'whiteAlpha.800'}
                >
                  절대.
                  <a
                    target="_blank"
                    rel="noreferrer"
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
              className={styles['slide-top']}
              w={['auto']}
              src="https://user-images.githubusercontent.com/100299692/164914118-9de82616-bb29-40e3-89eb-220f5a76fd84.png"
              fallbackSrc="https://via.placeholder.com/200"
            />
          </Center>
          <Flex flexDir={'column'} w={'300px'}>
            <StyledFirebaseAuth
              uiConfig={uiConfig}
              firebaseAuth={firebase.auth()}
            />
          </Flex>

          <Text fontSize={'sm'} color={'blackAlpha.500'}>
            데이터는 모두 firebase db에 저장되며, 따라서 제가 읽어버릴 수
            있게되지만 읽지 않겠습니다<br></br> (각오 및 동의하는 자만
            가입하씨요)
          </Text>
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
