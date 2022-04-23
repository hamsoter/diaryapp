import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Button,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from '@chakra-ui/react';
import React from 'react';

const YearFilter = ({ selected, data, onSelectYear }) => {
  // 일기를 작성한 년도만 골라서 불러옴

  let yearArr = [];
  data &&
    data.map(item => {
      const date = new Date(item.date);
      yearArr.push(date.getFullYear());
    });

  // 중복 없애기
  yearArr = [...new Set(yearArr)].sort((a, b) => {
    return b - a;
  });

  const yearChangeHandler = year => {
    onSelectYear(+year);
  };

  return (
    <Menu closeOnSelect={true}>
      <MenuButton
        colorScheme={'orange'}
        _focus={{ boxShadow: 'outline', bg: 'orange.200' }}
        _hover={{ bg: 'orange.200' }}
        _active={{ bg: 'orange.200' }}
        as={Button}
        w={'240px'}
        border={'none'}
        m={'auto'}
        mt={3}
        mb={1.5}
        variant="outline"
        rightIcon={<ChevronDownIcon />}
        bg={'whiteAlpha.800'}
        _expanded={{ bg: 'whiteAlpha.800' }}
      >
        {selected}
      </MenuButton>
      <MenuList minWidth={['240px']}>
        <MenuOptionGroup
          defaultValue={selected.toString()}
          title={
            yearArr.length === 0
              ? `기록된 날이 없어요 @_@!`
              : `선택한 해의 일기를 출력합니다`
          }
          type="radio"
          onChange={yearChangeHandler}
        >
          {yearArr.map(item => {
            return (
              <MenuItemOption key={item} value={item.toString()}>
                {item}
              </MenuItemOption>
            );
          })}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

export default YearFilter;
