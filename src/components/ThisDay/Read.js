import React from 'react';

import { ArrowBackIcon } from '@chakra-ui/icons';
import Header from '../../components/DiaryLists/Header';
import MainContainer from '../../components/UI/MainContainer';
import MainContent from '../../components/UI/MainContent';
import { IconButton } from '@chakra-ui/react';

const Read = ({ onBack }) => {
  return (
    <MainContainer>
      {/* 헤더 */}
      <Header
        title={' 일기 쓰기 '}
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
      <MainContent></MainContent>
    </MainContainer>
  );
};

export default Read;
