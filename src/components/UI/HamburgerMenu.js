import { HamburgerIcon } from '@chakra-ui/icons';
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import React from 'react';

const HamburgerMenu = ({ li }) => {
  const DUMMY_DATA_ARR = [
    '열심히 만들고 있어요',
    '조금만 기다려 주세요',
    '(_　_)。゜zｚＺ🧡',
  ];

  return (
    <Menu colorScheme="orange">
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<HamburgerIcon boxSize="5" />}
        colorScheme="orange"
        color={'white'}
        bg="orange.400"
      />
      <MenuList>
        {DUMMY_DATA_ARR.map((item, index) => {
          return (
            <MenuItem key={index} color={'blackAlpha.700'}>
              {item}
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};

export default HamburgerMenu;
