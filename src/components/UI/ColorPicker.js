import { Center, Editable, useControllableState } from '@chakra-ui/react';
import React from 'react';
import { CirclePicker } from 'react-color';

const ColorPicker = props => {
  const colorChangeHandler = e => {
    props.onSetSelectedColor(e.hex);
  };

  const colorArr = [
    '#FF6900',
    '#FCB900',
    '#7BDCB5',
    '#00D084',
    '#8ED1FC',
    '#0693E3',
    '#ABB8C3',
    '#EB144C',
    '#F78DA7',
    '#9900EF',
  ];

  const stytles = {
    div: { background: 'red' },
  };

  return (
    <Center>
      <CirclePicker
        onChange={colorChangeHandler}
        // onChangeComplete={colorFunc}
        direction={'column'}
        color={props.onGetSelectedColor}
        colors={colorArr}
        width="240px" //240
        // circleSize={35}
        circleSpacing={20}
        style={stytles}
      ></CirclePicker>
    </Center>
  );
};

export default ColorPicker;
