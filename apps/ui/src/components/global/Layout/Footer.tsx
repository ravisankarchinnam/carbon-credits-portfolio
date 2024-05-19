import { Box, Text, Flex } from '@chakra-ui/react';
import Logo from '../Logo';
import { footerLabels } from '@/constants';

const seudoStyles = {
  content: '""',
  borderBottom: '1px solid',
  borderColor: 'gray.100',
  flexGrow: 1,
};

export default function Footer() {
  return (
    <Box as="footer" bg="gray.50" color="gray.400">
      <Box py={10}>
        <Flex
          align={'center'}
          _before={{
            ...seudoStyles,
            mr: 8,
          }}
          _after={{
            ...seudoStyles,
            ml: 8,
          }}
        >
          <Logo />
        </Flex>
        <Text pt={6} fontSize={'sm'} textAlign={'center'}>
          {footerLabels.copyright}
        </Text>
      </Box>
    </Box>
  );
}
