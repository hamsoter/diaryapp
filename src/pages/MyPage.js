import { ChakraProvider, IconButton, theme } from '@chakra-ui/react';
import Header from '../components/DiaryLists/Header';
import MainContainer from '../components/UI/MainContainer';
import MainContent from '../components/UI/MainContent';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import MyPageList from '../components/Mypage/MyPageList';

const MyPage = () => {
  let content = <>dd</>;
  const navigate = useNavigate();

  const onBack = () => {
    navigate(`/`);
  };

  return (
    <ChakraProvider h={'100%'} theme={theme}>
      <MainContainer>
        <Header
          title={'설정'}
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
          <MyPageList></MyPageList>
        </MainContent>
      </MainContainer>
    </ChakraProvider>
  );
};

export default MyPage;
