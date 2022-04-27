import {
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  ModalFooter,
  useToast,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useState } from 'react';
import ColorPicker from './ColorPicker';
import customColorTheme from './CustomColorTheme';

export const UpdateModalOverlay = ({ onClose, updateThisDiary, thisDiary }) => {
  // 알림창 관리
  const toast = useToast();

  const validator = values => {
    let error = {};

    const { title } = values;

    if (title.length < 1) {
      error.title = '일기장 이름을 입력하세요';
    }

    if (title.length > 17) {
      error.title = '일기장 이름은 18자 이상일 수 없습니다';
    }

    return error;
  };

  const [selectedColor, setSelectedColor] = useState('#FF6900');

  const formik = useFormik({
    // 초기값 설정
    initialValues: {
      title: thisDiary && thisDiary.title,
      color: selectedColor,
      userName: thisDiary && thisDiary.owner.name,
    },
    onSubmit: (values, action) => {
      // console.log(values);
      values.color = setColorTheme(selectedColor);

      action.resetForm();

      updateThisDiary(values);

      toast({
        title: '성공!',
        description: '다이어리가 더 멋지게 변경되었어요!🎇',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });

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
      case '#9900EF':
        selectedColorScheme = colors.brandPurple;
        break;

      default:
        selectedColorScheme = colors.brandOrange;
    }
    return selectedColorScheme;
  };

  return (
    <AlertDialogOverlay>
      <AlertDialogContent>
        <AlertDialogHeader fontSize="lg" fontWeight="bold">
          정보 수정
        </AlertDialogHeader>

        <AlertDialogBody>
          <form id="addDiaryForm" onSubmit={formik.handleSubmit}>
            <FormControl>
              <FormLabel htmlFor="userName">당신의 이름</FormLabel>
              <Input
                isDisabled
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
                일기장의 이름
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
              >
                변경
              </Button>
            </ModalFooter>
          </form>
        </AlertDialogBody>
      </AlertDialogContent>
    </AlertDialogOverlay>
  );
};

export default UpdateModalOverlay;
