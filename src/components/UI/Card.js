import { Box, chakra } from '@chakra-ui/react';

const Card = chakra(Box, {
  baseStyle: {
    display: 'flex',
    p: 3,
    flexDirection: 'column',
    background: 'orange.50',
    alignItems: 'center',
    gap: 6,
  },
  // props에서 설정 가능
  variants: {
    rounded: {
      padding: 8,
      borderRadius: 'xl',
      boxShadow: 'xl',
      bg: 'red',
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

export default Card;
