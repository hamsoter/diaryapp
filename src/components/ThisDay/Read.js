import React from 'react';
import {
  Box,
  Button,
  Center,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
  useMenuState,
  useStyles,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import Header from '../DiaryLists/Header';
import Card from '../UI/Card';
import MainContainer from '../UI/MainContainer';
import MainContent from '../UI/MainContent';
import { ArrowBackIcon } from '@chakra-ui/icons';

//Datepicker
import DatePick from '../UI/DatePick';

const Read = ({ onBack, data }) => {
  const weekArr = ['일', '월', '화', '수', '목', '금', '토'];

  console.log(data);
  return (
    <MainContainer>
      {/* 헤더 */}
      <Header
        title={data.title}
        leftContent={
          <IconButton
            colorScheme={'orange'}
            bg={'transparent'}
            aria-label="back-btn"
            icon={<ArrowBackIcon boxSize="5" onClick={onBack} />}
          />
        }
      />

      {/* 메인컨텐츠 */}
      <MainContent>
        <Card w={'100%'} h={'100%'}>
          <Box w={'100%'}>
            <Center textAlign={'center'} flexDir={'column'}>
              <Button
                colorScheme={'white'}
                bg={'transparent'}
                color={'orange.700'}
                className="example-custom-input"
                mb={3}
                _hover={{
                  bg: 'orange.100',
                }}
              >
                {' '}
                {`${data.date.getFullYear()}년 ${
                  data.date.getMonth() + 1
                }월 ${data.date.getDate()}일 ${
                  weekArr[data.date.getDay()]
                }요일`}
              </Button>
              {/* 타이틀 */}
              <Heading
                id="title"
                fontSize={'lg'}
                // bg={'red'}
                w={'100%'}
                h={'48px'}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                mb={3}
              >
                {data.title}
              </Heading>

              {/* 내용 */}
              <Box
                w={'100%'}
                className="content"
                id="content"
                type="text"
                // bg={'white'}
                p={3}
                h={`calc(100vh - 276px)`}
                whiteSpace="pre"
                textAlign={'left'}
                overflowY={'scroll'}
                sx={{
                  '&::-webkit-scrollbar': {
                    width: '8px',
                    backgroundColor: `rgba(0, 0, 0, 0.05)`,
                    overflow: 'hidden',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: `rgba(0, 0, 0, 0.05)`,
                  },
                }}
              >
                {data.content}
              </Box>

              <Button
                mt={['6', '6', '3']}
                type="submit"
                form="addDiaryForm"
                w={['100%', '100%', '100px']}
                colorScheme="orange"
                // onClick={formik.handleSubmit}
              >
                수정
              </Button>
            </Center>
          </Box>
        </Card>
      </MainContent>
    </MainContainer>
  );
};

export default Read;
