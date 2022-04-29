import { Box, Image, useRadio } from '@chakra-ui/react';

const RadioCard = props => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();
  return (
    <Box as="label">
      <input {...input} />
      <Box
        // mb={3}
        {...checkbox}
        cursor="pointer"
        // borderWidth="1px"
        borderRadius="full"
        // boxShadow="md"
        // bg={'whiteAlpha.700'}

        _checked={{
          bg: 'orange.300',

          color: 'white',
          borderColor: 'orange.600',
        }}
        p={3}
      >
        <Image w={['50px', '50px', '75px']} src={input.value}></Image>
        {/* {props.children} */}
      </Box>
      {/* <Tag colorScheme={'orange'}>
        {props.index == 0 && '야하~'}
        {props.index == 1 && '흠'}
        {props.index == 2 && '우에엥'}
        {props.index == 3 && '짱나'}
      </Tag> */}
    </Box>
  );
};

export default RadioCard;
