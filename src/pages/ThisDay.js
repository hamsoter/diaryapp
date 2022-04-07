import { ChakraProvider, IconButton, theme } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Read from '../components/ThisDay/Read';
import Write from '../components/ThisDay/Write';

const ThisDay = ({ getTempDiaries, mode, setMissingCount }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // mode
  const paramId = location.pathname.split('/')[3];

  const diaryId = location.pathname.split('/')[2];

  const paramMode = location.pathname.split('/')[4];

  let writer;
  let data;

  const [thisMode, setThisMode] = useState(paramMode ? paramMode : mode);

  // App에서 다이어리 배열을 임시로 받아옴.
  const diaries = getTempDiaries().find(item => item.id === diaryId);

  useEffect(() => {
    if (diaries === undefined) {
      setMissingCount(prevCount => prevCount + 1);
      navigate('/error');
    }
  }, [setMissingCount]);

  if (diaries === undefined) {
    return <></>;
  } else {
    // 유저명. 차후수정
    writer = diaries.userName;

    // url으로 읽어낼 데이터 찾아내기
    data =
      diaries.pages &&
      diaries.pages.filter(item => {
        return item.id === paramId;
      })[0];

    const saveData = data => {
      const newData = data;

      // 날짜순 정렬
      diaries.pages = [newData, ...diaries.pages].sort(function (a, b) {
        a = a.date;
        b = b.date;
        return a > b ? -1 : a < b ? 1 : 0;
      });

      // 마지막 업데이트일 갱신
      diaries.lastRecord = diaries.pages[0].date;

      // 페이지이동
      pageChange(newData);
    };

    const updateData = newData => {
      // 수정시 데이터 아이디 자동부여 취소 (좋은 방법이 아닌 거 같음)
      newData.id = data.id;

      // 배열에서 바꿔줘야 할 index 찾기
      const changeIndex = diaries.pages.findIndex(item => item.id == data.id);

      // 바꾸기
      diaries.pages.splice(changeIndex, 1, newData);

      // 마지막 업데이트일 갱신
      diaries.lastRecord = diaries.pages[0].date;

      //페이지 변경
      pageChange(newData);
    };

    const deleteData = () => {
      const deleteIndex = diaries.pages.findIndex(item => item.id == data.id);

      console.log('삭제할인덱스는 ', deleteIndex);
      diaries.pages.splice(deleteIndex, 1);
      goBack();
    };

    const pageChange = newData => {
      navigate(`/diary/${diaryId}/${newData.id}/read/`);
      setThisMode('read');
    };

    const goBack = () => {
      navigate(`/diary/${diaryId}`);
    };

    console.log('thisdaymode: ' + thisMode);

    return (
      <ChakraProvider h={'100%'} theme={theme}>
        {thisMode === 'read' && (
          <Read
            onBack={goBack}
            changeMode={setThisMode}
            data={data}
            deleteData={deleteData}
          ></Read>
        )}
        {thisMode === 'write' && (
          <Write onBack={goBack} writer={writer} saveData={saveData}></Write>
        )}

        {thisMode === 'update' && (
          <Write
            mode={thisMode}
            onBack={goBack}
            diaries={diaries}
            writer={writer}
            data={data}
            saveData={updateData}
          ></Write>
        )}
      </ChakraProvider>
    );
  }
};

export default ThisDay;
