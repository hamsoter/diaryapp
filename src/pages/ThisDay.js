import { ChakraProvider, theme } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Read from '../components/ThisDay/Read';
import Write from '../components/ThisDay/Write';
// firebase
import {
  ref,
  update,
  getDatabase,
  set,
  get,
  query,
  orderByChild,
  equalTo,
} from '@firebase/database';
import { getAuth } from 'firebase/auth';

const ThisDay = ({ mode, loginUser, db }) => {
  const dbref = ref(getDatabase());
  const location = useLocation();
  const navigate = useNavigate();

  const diaryId = location.pathname.split('/')[2];

  const paramMode = location.pathname.split('/')[4];

  let writer;

  const [thisMode, setThisMode] = useState(paramMode ? paramMode : mode);
  // 찾아낸 다이어리를 저장할 공간
  const [thisDiary, setThisDiary] = useState('');

  const [isLoading, setIsLoading] = useState(true);

  const auth = getAuth();

  useEffect(() => {
    // 로그인 체크
    auth.onAuthStateChanged(async user => {
      if (user) {
        let result;
        // findById
        const findById = await get(
          query(ref(db, 'diaries'), orderByChild('id'), equalTo(diaryId))
        );

        // db에 존재하는 다이어리인지 확인
        if (findById.val() === null) {
          navigate('/error');
          return;
        } else {
          result = Object.values(findById.val())[0];

          // 로그인한 유저의 다이어리인지 확인
          if (user.uid === result.owner) {
            setThisDiary(result);
          } else {
            navigate('/error');
          }
        }
      } else {
        navigate('/login');
      }

      setIsLoading(false);
    });
  }, [auth, db, diaryId, navigate]);

  if (thisDiary === undefined) {
    return null;
  } else {
    const saveDay = newDiary => {
      set(ref(db, '/pages/' + newDiary.id), {
        id: newDiary.id,
        owner: loginUser.id,
        diary: thisDiary,
        title: newDiary.title,
        content: newDiary.content,
        mood: newDiary.mood,
        date: newDiary.date.toString(),
      });

      // 다이어리 마지막 갱신일 수정
      if (new Date(thisDiary.lastRecord) < newDiary.date) {
        update(ref(db, '/diaries/' + diaryId), {
          lastRecord: newDiary.date.toString(),
        });
      }
      return newDiary;
    };

    const saveDayHandler = async newDiary => {
      console.log(newDiary);
      saveDay(newDiary);
      pageChange(newDiary);
    };

    const updateDataHandler = async newDiary => {
      console.log(newDiary);
      updateData(newDiary);
      pageChange(newDiary);
    };

    const updateData = newDiary => {
      const pageId = location.pathname.split('/')[3];
      newDiary.id = pageId;

      set(ref(db, '/pages/' + newDiary.id), {
        id: newDiary.id,
        mood: newDiary.mood,
        owner: loginUser.id,
        diary: thisDiary,
        title: newDiary.title,
        content: newDiary.content,
        date: newDiary.date.toString(),
      });

      // 다이어리 마지막 갱신일 수정
      if (new Date(thisDiary.lastRecord) < newDiary.date) {
        update(ref(db, '/diaries/' + diaryId), {
          lastRecord: newDiary.date.toString(),
        });
      }
    };

    const deleteData = thisPage => {
      const updates = {};
      updates['/pages/' + thisPage.id + '/'] = null;

      update(dbref, updates);

      goBack();
    };

    const pageChange = newData => {
      navigate(`/diary/${diaryId}/${newData.id}/read/`);
      setThisMode('read');
    };

    const goBack = () => {
      navigate(`/diary/${diaryId}`);
    };

    return (
      <ChakraProvider h={'100%'} theme={theme}>
        {thisMode === 'read' && (
          <Read
            isLoading={isLoading}
            db={db}
            data={thisDiary}
            onBack={goBack}
            changeMode={setThisMode}
            deleteData={deleteData}
          ></Read>
        )}
        {thisMode === 'write' && (
          <Write
            mode={thisMode}
            onBack={goBack}
            writer={writer}
            db={db}
            saveData={saveDayHandler}
          ></Write>
        )}
        {thisMode === 'update' && (
          <Write
            isLoading={isLoading}
            mode={thisMode}
            onBack={goBack}
            diaries={thisDiary}
            writer={writer}
            diary={thisDiary}
            db={db}
            saveData={updateDataHandler}
          ></Write>
        )}
      </ChakraProvider>
    );
  }
};

export default ThisDay;
