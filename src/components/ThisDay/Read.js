import React from 'react';

import { ArrowBackIcon } from '@chakra-ui/icons';
import Header from '../../components/DiaryLists/Header';
import MainContainer from '../../components/UI/MainContainer';
import MainContent from '../../components/UI/MainContent';
import { Box, Container, IconButton, Text } from '@chakra-ui/react';
import { useFormik } from 'formik';

import Card from '../UI/Card';

const Read = ({ onBack, data }) => {
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
        <Card>
          <Box>
            <Text className={`date read`}>{data.date.toLocaleString()}</Text>
            <Text className="content read">{data.content}</Text>
            <Text className="mood read">{data.mood}</Text>
            <Text className="writer read">{data.writer}</Text>
          </Box>
        </Card>
      </MainContent>
    </MainContainer>
  );
};

export default Read;
