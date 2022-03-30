import React from 'react';

import {
  Button,
  ModalFooter,
  // 폼
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  extendTheme,
} from '@chakra-ui/react';
import ColorPicker from '../UI/ColorPicker';
import { useFormik } from 'formik';
import customColorTheme from '../UI/CustomColorTheme';

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

      pages: [],
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

  const { colors } = customColorTheme;

  // 컬러 테마 세팅... 하드코딩...
  const setColorTheme = color => {
    color = color.toUpperCase();

    let selectedColorScheme = {
      label: '',
      mainColor: '',
      subColor: '',
      trextColor: 'white',
      // 추가됨
      normal50: '#FFFAF0',
      normal100: '#FEEBC8',
      normal300: '#F6AD55',
    };

    switch (color) {
      case '#FF6900': // orange
        selectedColorScheme = colors.brandOrange;
        break;
      case '#FCB900': // yellow
        selectedColorScheme = colors.brandYellow;
        break;
      case '#7BDCB5': // mint
        selectedColorScheme = colors.brandMint;
        break;
      case '#48BB78': // green
        selectedColorScheme = colors.brandGreen;
        break;
      case '#8ED1FC': // skyblue
        selectedColorScheme = colors.brandSkyblue;
        break;
      case '#0693E3': // blue
        selectedColorScheme = colors.brandBlue;
        break;
      case '#ABB8C3': // gray
        selectedColorScheme = colors.brandGray;
        break;
      case '#EB144C': // hotpink
        selectedColorScheme = colors.brandHotpink;
        break;
      case '#F78DA7': // pink
        selectedColorScheme = colors.brandpink;
        break;
      case '9900EF':
        selectedColorScheme = colors.brandPurple;
        break;

      default:
        selectedColorScheme = colors.brandOrange;
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
