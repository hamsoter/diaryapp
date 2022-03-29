import {
  Box,
  Heading,
  Text,
  ListItem,
  UnorderedList,
  Button,
  Divider,
  Flex,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../DiaryLists/Header';
import Card from '../UI/Card';
import MainContents from '../UI/MainContents';
import styles from '../UI/animation.module.css';

const NotFound = ({ missingCount }) => {
  return (
    <>
      <MainContents>
        <Card
          rounded={5}
          m={0}
          p={3}
          fontSize={['xl', 'lg', 'lg']}
          h={['auto', 'auto', '100%']}
          boxShadow={'xs'}
        >
          <Box className={styles['shake-bottom']}>
            <Heading
              className="not-found-logo"
              fontFamily={'NeoDunggeunmo'}
              color={'orange.500'}
              mb={'-50px'}
              fontSize={'142px'}
              cursor={'default'}
            >
              404
            </Heading>
          </Box>
          <Heading
            fontFamily={'NeoDunggeunmo'}
            fontSize={'24px'}
            color={'orange.800'}
          >
            잘못된 주소예요
          </Heading>
          <Card px={[5, 5, 20]} bg={'transparent'}>
            <Text fontSize={['xl', 'xl', 'lg']} color={'blackAlpha.700'}>
              잘못된 주소를 통해 이 비밀스러운 페이지에 입장하셨군요! 당신은
              이곳의 {missingCount}번째 미아입니다. 반가워요! ヾ(•ω•`)o<br></br>
              하지만 여기에 계속 머무를 수는 없겠죠? 이별은 아쉽지만, 선물로
              <b> '사이버 미아 행동 요령'</b>을 드릴게요. 그럼 잘가요!
            </Text>
            <Link to="/">
              <Button colorScheme={'orange'} size={'lg'}>
                메인으로
              </Button>
            </Link>
            <Divider />
            <Heading size={'md'} fontFamily={'DOSMyungjo'} color={'orange.800'}>
              * 국제 사이버 미아 행동 요령 *
            </Heading>
            <UnorderedList
              fontSize={['lg', 'lg', 'md']}
              px={['10', '10', '20']}
              listStyleType={'number'}
              w={'100%'}
              bg={'orange.100'}
              py={3}
              pt={5}
              m={0}
              rounded={20}
            >
              <ListItem mb={2}>
                <Text>
                  <b>당황하지 말고 침착하십시오.</b>
                  <br></br>
                  길을 잃었을 때 당황하면 길을 빨리 찾지 못할 수도 있어요.
                </Text>
              </ListItem>
              <ListItem mb={2}>
                <Text>
                  <b>어디를 가려고 했는지 잘 떠올려보십시오.</b> <br></br>
                  분명 무사히 원하는 곳으로 도착할 수 있을 거예요.
                </Text>
              </ListItem>
              <ListItem mb={2}>
                <Text>
                  <b>당당하게 비장의 초콜릿을 꺼내 먹읍시다.</b>
                  <br />
                  언제나 긍정적인 마음가짐!
                </Text>
              </ListItem>
              <ListItem mb={2}>
                <Text>
                  <b>준비가 되었다면 이제 출발하세요!</b>
                </Text>
              </ListItem>
            </UnorderedList>
          </Card>
        </Card>
      </MainContents>
    </>
  );
};

export default NotFound;
