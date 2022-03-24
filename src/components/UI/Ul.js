import { UnorderedList, chakra } from '@chakra-ui/react';

const Ul = chakra(UnorderedList, {
  baseStyle: {
    display: 'flex',
    // bg: 'red',
    w: '100%',
    p: 0,
    m: 0,
    flexWrap: 'wrap',
  },
});

export default Ul;
