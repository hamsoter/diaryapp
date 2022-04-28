import {
  Box,
  Button,
  ChakraProvider,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  theme,
  useToast,
} from '@chakra-ui/react';
import Header from '../components/DiaryLists/Header';
import MainContainer from '../components/UI/MainContainer';
import MainContent from '../components/UI/MainContent';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import Card from '../components/UI/Card';
import { Form, useFormik } from 'formik';
import { useEffect, useState } from 'react';

import {
  ref,
  get,
  query,
  orderByChild,
  equalTo,
  update,
  getDatabase,
} from '@firebase/database';
import { getAuth } from 'firebase/auth';
// import { getAuth } from 'firebase/auth';

const ReName = ({ loginUser, db, setLoginUser }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const auth = getAuth();
  const dbref = ref(getDatabase());

  console.log();
  useEffect(async () => {
    // 로그인 체크
    auth.onAuthStateChanged(async user => {
      if (user) {
        console.log('로그인됨', user.uid);
      } else {
        navigate('/login');
      }
    });
  }, []);

  const onBack = () => {
    navigate(`/mypage`);
  };

  const submitHandler = e => {
    e.preventDefault();
    // 바꿀 이름 지정
    const newName = e.target[0].value;

    const updateName = {};

    // console.log(loginUser);
    updateName['users/' + loginUser.id + '/name'] = newName;

    // db에 저장된 유저에 바꿀이름을 집어넣음
    update(dbref, updateName);

    console.log(loginUser);
    setLoginUser({
      id: loginUser.id,
      name: newName,
      email: loginUser.email,
    });
  };

  return (
    <ChakraProvider h={'100%'} theme={theme}>
      <MainContainer>
        <Header
          title={'이름 변경'}
          leftContent={
            <IconButton
              colorScheme={'orange'}
              bg={'transparent'}
              aria-label="back-btn"
              icon={<ArrowBackIcon boxSize="5" onClick={onBack} />}
            />
          }
        />
        <MainContent>
          <Card w={'100%'} h={'100%'} m={0} p={5}>
            {/* 컨텐츠 */}

            <form
              id="nameChangeForm"
              onSubmit={submitHandler}
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                justifyContent: 'space-between',
              }}
            >
              <FormControl onSubmit={submitHandler} m={0} isRequired>
                <FormLabel
                  fontSize={['md', 'md', 'lg']}
                  mb={3}
                  htmlFor="newUserName"
                >
                  이름
                </FormLabel>
                <Input
                  display={'flex'}
                  bg={'white'}
                  defaultValue={loginUser ? loginUser.name : ''}
                  id="newUserName"
                />

                <FormHelperText mt={5}>
                  바뀐 이름은 모든 일기에 적용됩니다!
                </FormHelperText>
              </FormControl>

              <Button
                mt={4}
                colorScheme="orange"
                type={'submit'}
                form="nameChangeForm"
              >
                확인
              </Button>
            </form>
          </Card>
        </MainContent>
      </MainContainer>
    </ChakraProvider>
  );
};

export default ReName;
