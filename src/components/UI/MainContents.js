import { baseStyle, calc, chakra, extendTheme, Flex } from '@chakra-ui/react';
import React from 'react';

const MainContents = chakra(Flex, {
  baseStyle: {
    p: 3,
    display: 'flex',
    flexDirection: 'column',
    // background: 'white',
    alignItems: 'center',
    gap: 6,
    bg: 'red',
    m: 'auto',
    h: 'calc(100vh - 64px)',
    // border: '1px solid white',
    flexWrap: 'wrap',
    overflow: 'auto',
    sx: {
      '&::-webkit-scrollbar': {
        width: '16px',
        borderRadius: '8px',
        backgroundColor: `rgba(0, 0, 0, 0.05)`,
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: `rgba(0, 0, 0, 0.05)`,
      },
    },
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
});

export default MainContents;
