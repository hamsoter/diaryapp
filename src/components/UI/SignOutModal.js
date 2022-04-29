import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';

// firebase
import {
  ref,
  set,
  get,
  update,
  query,
  orderByChild,
  equalTo,
  getDatabase,
} from '@firebase/database';
import { useNavigate } from 'react-router-dom';
import { FirebaseAuth } from 'react-firebaseui';
import { deleteUser, getAuth } from 'firebase/auth';

const SignOutModal = ({ onClose, loginUser, db, setLoginUser }) => {
  const [isDisabled, setIsDisabled] = useState(true);

  const dbref = ref(getDatabase());

  const navigate = useNavigate();

  const onBack = () => {
    navigate(`/`);
  };

  const deleteAuthUser = () => {
    const auth = getAuth();

    const user = auth.currentUser;

    console.log(user);

    deleteUser(user)
      .then(() => {
        // user deleted
      })
      .catch(e => {});
  };

  const deleteAll = async point => {
    // 탈퇴유저가 owner인 데이터를 찾음

    console.log(point);
    const obj = await get(
      query(ref(db, point), orderByChild('owner'), equalTo(loginUser.id))
    );

    console.log(obj.val());

    const updates = {};

    // 데이터가 있을시 지움
    if (obj.val() !== null) {
      console.log(obj.val());

      const arr = Object.values(obj.val());

      arr.map(item => {
        console.log(item);
        updates[point + item.id] = null;
        console.log(updates);
        update(dbref, updates);
      });
    } else {
      console.log('지울 게 없더');
    }
  };

  const deleteDbUser = async () => {
    const updates = {};

    updates['users/' + loginUser.id] = null;
    update(dbref, updates);
  };

  const signout = async () => {
    console.log('signout');

    // db/diaries, db/pages 삭제
    await deleteAll('pages/');
    await deleteAll('diaries/');

    // // db/users 정보 삭제
    await deleteDbUser();

    // // 인증 해제
    deleteAuthUser();

    // // 클라이언트 유저정보 클리어

    // // 로그아웃
    onBack();
  };

  const validator = value => {
    let error;
    console.log();
    if (value !== '탈퇴합니다') {
      error = '메세지 불일치';
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }

    return error;
  };

  return (
    <>
      <ModalOverlay />
      <ModalContent mx={[3, 0, 0]} w={['100%', '350px', '100%']}>
        <ModalHeader>정말요...?</ModalHeader>
        <ModalBody>
          <Text mb="1rem">
            영원히 떠나시는 게 맞나요?
            <br></br>
            <br></br>
            데이터는 영원히 삭제되고 절대 복구되지 않으며 귀여운 유령이 눈물을
            흘립니다...
          </Text>

          <FormLabel mb={10} display={'flex'} fontWeight="bold">
            동의한다면 '탈퇴합니다' 를 입력하세요.
          </FormLabel>
        </ModalBody>
        <Box
          w={'100%'}
          display={'flex'}
          flexWrap="wrap"
          gap={2}
          px={5}
          flexDir="column"
        >
          <Formik
            initialValues={{ message: '' }}
            onSubmit={(values, actions) => {
              console.log(values);
              signout();
            }}
          >
            {props => (
              <Form w={'100%'} p={0}>
                <Field name="message" validate={validator}>
                  {({ field, form }) => {
                    return (
                      <FormControl
                        mb={2}
                        isInvalid={form.errors.message && form.touched.message}
                      >
                        <Input {...field} id="message" placeholder="name" />
                      </FormControl>
                    );
                  }}
                </Field>
                <Button
                  mb={2}
                  isDisabled={isDisabled}
                  w={'100%'}
                  colorScheme="red"
                  color={'white'}
                  isLoading={props.isSubmitting}
                  type="submit"
                >
                  탈퇴
                </Button>
                <Button mb={5} w={'100%'} onClick={onClose}>
                  역시 관두기
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </ModalContent>
    </>
  );
};

export default SignOutModal;
