import { baseStyle } from '@chakra-ui/react';
import React from 'react';

const Card = {
  baseStyle: {
    display: 'flex',
    p: 3,
    flexDirection: 'column',
    background: 'white',
    alignItems: 'center',
    gap: 6,
  },
  // props에서 설정 가능
  variants: {
    rounded: {
      padding: 8,
      borderRadius: 'xl',
      boxShadow: 'xl',
    },
    smooth: {
      padding: 6,
      borderRadius: 'base',
      boxShadow: 'md',
    },
  },
  // 디폴트
  defaultProps: {
    variant: 'smooth',
  },
};

export default Card;
