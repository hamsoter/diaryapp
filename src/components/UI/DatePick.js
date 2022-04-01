import { Button } from '@chakra-ui/react';
import React, { forwardRef, useState } from 'react';

import ko from 'date-fns/locale/ko';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';

import '../UI/dp.css';

const DatePick = ({ startDate, setStartDate, date }) => {
  const weekArr = ['일', '월', '화', '수', '목', '금', '토'];

  registerLocale('ko', ko);

  const ExampleCustomInput = forwardRef(({ date, onClick }, ref) => (
    <Button
      colorScheme={'white'}
      bg={'transparent'}
      color={'orange.700'}
      className="example-custom-input"
      onClick={onClick}
      ref={ref}
      mb={3}
      _hover={{
        bg: 'orange.100',
      }}
    >
      {`${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${
        weekArr[date.getDay()]
      }요일`}
    </Button>
  ));

  return (
    <DatePicker
      selected={startDate}
      locale="ko"
      className={'dp'}
      dateFormat="yyyy-MM-dd" // 날짜 형식 설정
      dateFormatCalendar={'yyyy년 MM'}
      onChange={date => setStartDate(date)}
      customInput={<ExampleCustomInput date={new Date(startDate)} />}
      popperPlacement="auto"
    />
  );
};
export default DatePick;
