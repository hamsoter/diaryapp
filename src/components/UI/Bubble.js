import { Flex } from '@chakra-ui/react';
import styles from '../UI/Bubble.module.css';

const Bubble = props => {
  return <Flex className={styles.speechbubble}>{props.children}</Flex>;
};

export default Bubble;
