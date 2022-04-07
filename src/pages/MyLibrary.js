import React, { useEffect } from 'react';

import '../components/UI/App.css';
import { ChakraProvider, Box, theme, chakra } from '@chakra-ui/react';

import DiaryLists from '../components/DiaryLists/DiaryLists';
import AddDiaryModal from '../components/DiaryLists/AddDiaryModal';
import Header from '../components/DiaryLists/Header';
import MainContent from '../components/UI/MainContent';
import MainContents from '../components/UI/MainContents';
import MainContainer from '../components/UI/MainContainer';

// firebase
import { ref, set, get } from 'firebase/database';

const MyLibrary = ({ getTempDiaries, setTempDiaries, db }) => {
  // let DUMMY_DATA_ARR = getTempDiaries();

  const [diaries, setDiaries] = React.useState([]);

  useEffect(async () => {
    const data = await get(ref(db, `diaries`));

    const dataArr = Object.values(data.val());
    console.log(dataArr);

    const solved = dataArr.map(item => {
      item.lastRecord = new Date(item.lastRecord);
      item.pages = item.pages ? item.pages : [];

      return item;
    });

    setDiaries(solved);

    // setDiaries(()=> {
    //   data.val()
    // });

    // 최초 한번만 실행
  }, []);

  const saveDiaryHandler = newDiary => {
    console.log(newDiary);
    set(ref(db, 'diaries/' + newDiary.id), {
      id: newDiary.id,
      userName: newDiary.userName,
      color: newDiary.color,
      title: newDiary.title,

      lastRecord: newDiary.lastRecord.toString(),
      // pages: ['야호야호'],
    });
    setDiaries(prevState => {
      return [newDiary, ...prevState];
    });
  };

  // setTempDiaries(diaries);

  return (
    <ChakraProvider h={'100%'} theme={theme}>
      {/* <Box h={'100%'} w={['100%', '400px', '750px']} m="auto"> */}
      <MainContainer>
        <Header
          title={'책장'}
          rightContent={<AddDiaryModal onSaveDiary={saveDiaryHandler} />}
        />
        {/* <MainContent>
          <DiaryLists diaries={diaries}></DiaryLists>
        </MainContent> */}

        <MainContents>
          <DiaryLists diaries={diaries}></DiaryLists>
        </MainContents>
        {/* </Box> */}
      </MainContainer>
    </ChakraProvider>
  );
};

export default MyLibrary;
