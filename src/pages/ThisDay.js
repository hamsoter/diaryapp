import { ChakraProvider, IconButton, theme } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Read from '../components/ThisDay/Read';
import Write from '../components/ThisDay/Write';
// firebase
import {
  ref,
  set,
  get,
  child,
  push,
  update,
  getDatabase,
} from 'firebase/database';

const ThisDay = ({
  getTempDiaries,
  mode,
  setMissingCount,
  getDiariesArr,
  loadDiaries,
  db,
}) => {
  const dbref = ref(getDatabase());
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
  const diaries = getDiariesArr().find(item => item.id === diaryId);

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
      Object.values(diaries.pages).filter(item => {
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

    const saveDay = newDiary => {
      const postData = {
        title: newDiary.title,
        writer: newDiary.writer,
        content: newDiary.content,
        id: newDiary.id,
        mood: 0,
        title: newDiary.title,

        date: newDiary.date.toString(),
      };

      // const newPostKey = push(child(ref(db), 'diaries')).key;

      const updates = {};
      updates['diaries/' + diaryId + '/pages/' + newDiary.id + '/'] = postData;

      update(dbref, updates);

      return newDiary;
    };

    const saveDayHandler = async newDiary => {
      saveDay(newDiary);

      // 저장된 데이터 다시 불러오기
      await loadDiaries();

      pageChange(newDiary);
    };

    const updateDataHandler = async newDiary => {
      updateData(newDiary);

      // 저장된 데이터 다시 불러오기
      await loadDiaries();

      pageChange(newDiary);
    };

    const updateData = newDiary => {
      // 수정시 데이터 아이디 자동부여 취소 (좋은 방법이 아닌 거 같음)
      newDiary.id = data.id;

      const postData = {
        title: newDiary.title,
        writer: newDiary.writer,
        content: newDiary.content,
        id: data.id,
        mood: 0,
        title: newDiary.title,

        date: newDiary.date.toString(),
      };

      // const newPostKey = push(child(ref(db), 'diaries')).key;

      const updates = {};
      updates['diaries/' + diaryId + '/pages/' + data.id + '/'] = postData;

      // //페이지 변경
      pageChange(newDiary);
      return update(dbref, updates);
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
          <Write
            onBack={goBack}
            writer={writer}
            saveData={saveDayHandler}
          ></Write>
        )}

        {thisMode === 'update' && (
          <Write
            mode={thisMode}
            onBack={goBack}
            diaries={diaries}
            writer={writer}
            data={data}
            saveData={updateDataHandler}
          ></Write>
        )}
      </ChakraProvider>
    );
  }
};

export default ThisDay;
