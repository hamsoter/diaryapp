import React, { useRef } from 'react';

import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  useDisclosure,
} from '@chakra-ui/react';

const AddDiaryBtn = () => {
  return (
    <Popover defaultIsOpen={true} closeOnBlur={false}>
      <PopoverContent w={200} color={'orange.700'}>
        <PopoverArrow />
        <PopoverCloseButton mt={1} />
        <PopoverHeader fontWeight={'bold'}>반가워요!</PopoverHeader>
        <PopoverBody>이곳을 눌러 새 일기장을 생성할 수 있습니다!</PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default AddDiaryBtn;
