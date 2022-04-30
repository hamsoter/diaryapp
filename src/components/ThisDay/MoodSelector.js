import { Box, HStack, Text, useRadioGroup } from '@chakra-ui/react';
import RadioCard from '../UI/RadioCard';

const MoodSelector = ({ setMood }) => {
  const options = [
    'https://user-images.githubusercontent.com/100299692/165281611-90f31def-287e-46d4-b948-5b3c20113c02.png',
    'https://user-images.githubusercontent.com/100299692/165281598-4a5e2033-3f7a-4115-9347-64cf2ec88893.png',
    'https://user-images.githubusercontent.com/100299692/165281610-36e390a4-fab3-4146-a83c-4ccaf3c39b01.png',
    'https://user-images.githubusercontent.com/100299692/165281613-955ce4e2-fbfc-4d23-abf5-dda3e3bb0e34.png',
  ];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'framework',
    defaultValue: options[0],
    onChange: e => {
      const mood = options.indexOf(e);
      setMood(mood);
      // console.log(mood);
    },
  });

  const group = getRootProps();

  return (
    <Box m={3}>
      <Text
        colorScheme={'orange'}
        fontWeight={'black'}
        color="orange.300"
        fontSize={['16px', '16px', '22.5px']}
        px={5}
        mb={6}
      >
        오늘의 기분은 ...
      </Text>
      <HStack {...group} bg={'orange.100'} rounded="full" p={3}>
        {options.map((value, index) => {
          const radio = getRadioProps({ value });

          return (
            <RadioCard key={value} index={index} {...radio}>
              {value}
            </RadioCard>
          );
        })}
      </HStack>
    </Box>
  );
};

export default MoodSelector;
