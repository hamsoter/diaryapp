import { EditIcon } from '@chakra-ui/icons';

import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Skeleton,
  SkeletonCircle,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import Bubble from '../../components/UI/Bubble';
import Card from '../UI/Card';

const CurrnetMain = ({ thisDiary, isLoading }) => {
  let location = useLocation();
  const path = `${location.pathname}`;

  return (
    <Card
      display={'flex'}
      alignItems={'center'}
      flexDir={'column'}
      bg={'#fffaf0a6'}
      borderRadius={5}
      pb={5}
      px={5}
      pt={10}
      gap={0}
    >
      <Bubble>
        <Flex flexDir={'column'} w={'100%'} alignItems={'center'}>
          <Stack>
            <Skeleton
              startColor={'whiteAlpha.300'}
              endColor="orange.500"
              isLoaded={!isLoading}
            >
              <Heading fontSize={['xl']} color="whiteAlpha.900">
                안녕, {thisDiary ? thisDiary.owner.name : ''}
              </Heading>
            </Skeleton>
            <Skeleton
              startColor={'whiteAlpha.300'}
              endColor="orange.500"
              isLoaded={!isLoading}
            >
              <Text fontSize={'normal'} color="whiteAlpha.900">
                일기 쓰기 좋은 날이네요!
              </Text>
            </Skeleton>
          </Stack>
        </Flex>
      </Bubble>
      <Box>
        <SkeletonCircle isLoaded={!isLoading} size={'145px'} m={5}>
          <Image
            w={'100%'}
            src="https://user-images.githubusercontent.com/100299692/164914118-9de82616-bb29-40e3-89eb-220f5a76fd84.png"
            fallbackSrc="https://via.placeholder.com/145"
          ></Image>
        </SkeletonCircle>
      </Box>

      {/* 액션버튼 */}
      <Box displat={'flex'} width={'100%'} className="action-btns">
        <Link to={`${path}/write`}>
          <Button
            className="write-diary-btn"
            w={'100%'}
            size={'lg'}
            colorScheme={'orange'}
            bg={'orange.400'}
            color="white"
            aria-label="Send email"
            variant="solid"
          >
            <Skeleton
              display={'flex'}
              startColor={'whiteAlpha.300'}
              endColor="orange.500"
              isLoaded={!isLoading}
            >
              <Text fontSize={'normal'} color="whiteAlpha.900">
                일기 쓰기
                <EditIcon ml={2}></EditIcon>
              </Text>
            </Skeleton>
          </Button>
        </Link>
      </Box>
    </Card>
  );
};

export default CurrnetMain;
