import React from 'react';

import {
  Button,
  ModalFooter,
  // 폼
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
} from '@chakra-ui/react';
import ColorPicker from '../UI/ColorPicker';
import { useFormik } from 'formik';

const AddDiaryForm = props => {
  const { onClose, onGetData } = props;

  // form의 validation을 확인하는 메서드
  const validator = values => {
    let error = {};

    const { userName, title } = values;

    if (userName.length < 1) {
      error.userName = '이름을 입력하세요';
    }
    if (title.length < 1) {
      error.title = '일기장 이름을 입력하세요';
    }

    // console.log(error);
    // 에러 객체가 있을 시 handler이 submit 되지 않음
    return error;
  };

  const [selectedColor, setSelectedColor] = React.useState('#FF6900');

  const formik = useFormik({
    // 초기값 설정
    initialValues: {
      id: '',
      userName: '',
      title: '',
      color: selectedColor,
      // 임시 날짜
      lastRecord: new Date(),
    },
    onSubmit: (values, action) => {
      values.id = Math.random().toString(36).substring(2, 8);
      values.color = selectedColor;
      values.color = setColorTheme(values.color);

      onGetData(values);
      action.resetForm();
      onClose();
    },
    // 값 변경시마다 유효성체크
    validateOnChange: true,
    // 인풋창 블러시마다 유효성체크
    validateOnBlur: true,
    validate: validator,
  });

  // 컬러 테마 세팅... 하드코딩...
  const setColorTheme = color => {
    color = color.toUpperCase();

    let selectedColorScheme = {
      label: '',
      mainColor: '',
      subColor: '',
      trextColor: 'white',
    };

    // orange
    if (color === '#FF6900') {
      selectedColorScheme = {
        ...selectedColorScheme,
        label: 'orange',
        mainColor: '#FF6900',
        subColor: '#ad4700',
      };
      // yellow
    } else if (color === '#FCB900') {
      selectedColorScheme = {
        ...selectedColorScheme,
        label: 'yellow',
        mainColor: '#FCB900',
        subColor: '#a76d00',
      };
      // mint
    } else if (color === '#7BDCB5') {
      selectedColorScheme = {
        ...selectedColorScheme,
        label: 'mint',
        mainColor: '#7BDCB5',
        subColor: '#1A9262',
      };
      // green
    } else if (color === '#48BB78') {
      selectedColorScheme = {
        ...selectedColorScheme,
        label: 'green',
        mainColor: '#48BB78',
        subColor: '#2F855A',
      };
      // skyblue
    } else if (color === '#8ED1FC') {
      selectedColorScheme = {
        ...selectedColorScheme,
        label: 'skyblue',
        mainColor: '#8ED1FC',
        subColor: '#4399D0',
      };
      // blue
    } else if (color === '#0693E3') {
      selectedColorScheme = {
        ...selectedColorScheme,
        label: 'blue',
        mainColor: '#0693E3',
        subColor: '#8ED1FC',
        trextColor: '#003858',
      };
      // gray
    } else if (color === '#ABB8C3') {
      selectedColorScheme = {
        ...selectedColorScheme,
        label: 'gray',
        mainColor: '#ABB8C3',
        subColor: '#4D5358',
      };
      // hotpink
    } else if (color === '#EB144C') {
      selectedColorScheme = {
        ...selectedColorScheme,
        label: 'hotpink',
        mainColor: '#EB144C',
        subColor: '#F78DA7',
        trextColor: '#EB144C',
      };
      // pink
    } else if (color === '#F78DA7') {
      selectedColorScheme = {
        ...selectedColorScheme,
        label: 'pink',
        mainColor: '#F78DA7',
        subColor: '#EB144C',
      };
    } else if (color === '#9900EF') {
      selectedColorScheme = {
        ...selectedColorScheme,
        label: 'purple',
        mainColor: '#9900EF',
        subColor: '#d895ff',
      };
    }

    return selectedColorScheme;
  };

  return (
    <form id="addDiaryForm" onSubmit={formik.handleSubmit}>
      <FormControl>
        <FormLabel htmlFor="userName">당신의 이름</FormLabel>
        <Input
          id="userName"
          onChange={formik.handleChange}
          value={formik.values.userName}
          type="text"
          colorScheme={'orange'}
        />
        <FormHelperText fontSize={'sm'} color={'red.400'}>
          {formik.errors.userName}
        </FormHelperText>
        <FormLabel mt={5} htmlFor="title">
          새 일기장의 이름
        </FormLabel>
        <Input
          id="title"
          onChange={formik.handleChange}
          value={formik.values.title}
          type="text"
          colorScheme={'orange'}
        />
        <FormHelperText fontSize={'sm'} color={'red.400'}>
          {formik.errors.title}
        </FormHelperText>
        <FormLabel mt={5}>커버 색상</FormLabel>
        <ColorPicker
          onGetSelectedColor={selectedColor}
          onSetSelectedColor={setSelectedColor}
        ></ColorPicker>
      </FormControl>

      <ModalFooter px={0}>
        <Button
          mt={5}
          type="submit"
          form="addDiaryForm"
          w={['100%', '100%', '100px']}
          colorScheme="orange"
          onClick={formik.handleSubmit}
        >
          추가
        </Button>
      </ModalFooter>
    </form>
  );
};

export default AddDiaryForm;
