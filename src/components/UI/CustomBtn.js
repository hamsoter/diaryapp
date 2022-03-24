import { Button, chakra } from '@chakra-ui/react';
import React from 'react';

const CustomBtn = props => {
  const Btn = chakra(Button, {
    baseStyle: {},
  });

  return <Btn>{props.children}</Btn>;
};

export default CustomBtn;
