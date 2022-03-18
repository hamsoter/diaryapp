import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
} from '@chakra-ui/react';

const AddDiaryForm = () => {
  return (
    <FormControl>
      <FormLabel htmlFor="email">새 일기장의 이름을 입력하세요</FormLabel>
      <Input id="email" type="email" />
      <FormHelperText>We'll never share your email.</FormHelperText>
    </FormControl>
  );
};

export default AddDiaryForm;
