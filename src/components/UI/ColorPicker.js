import { Center, Editable, useControllableState } from '@chakra-ui/react';
import React from 'react';
import { CirclePicker } from 'react-color';

const ColorPicker = props => {
  const colorChangeHandler = e => {
    props.onSetSelectedColor(e.hex);
    return e.hex;
  };

  const colorArr = [
    '#FF6900', // orange
    '#FCB900', // yellow
    '#7BDCB5', // mint
    // '#00D084',
    '#48BB78', // green #2F855A
    '#8ED1FC', // skyblue #4399D0
    '#0693E3', // blue
    '#ABB8C3', // gray
    '#EB144C', // hotpink
    '#F78DA7', // pink
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
