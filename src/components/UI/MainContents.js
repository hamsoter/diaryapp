import { chakra, Flex } from '@chakra-ui/react';

const MainContents = chakra(Flex, {
  baseStyle: {
    w: '100%', // auto?
    py: 3,
    pl: 3,
    display: 'flex',
    flexDirection: 'column',
    // background: 'white',
    alignItems: 'center',
    gap: 6,
    bg: 'orange.100',
    h: 'calc(100vh - 64px)',
    // border: '1px solid white',
    flexWrap: 'wrap',
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      width: '12px',
      backgroundColor: 'rgba(0, 0, 0, 0.00)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: `rgba(0, 0, 0, 0.09)`,
      backgroundClip: 'padding-box',
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
