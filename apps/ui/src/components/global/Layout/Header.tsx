'use client';

import { Link } from '@chakra-ui/next-js';
import { Box, Flex } from '@chakra-ui/react';
import Logo from '../Logo';

export default function Header() {
  return (
    <Box as="header" px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <Box>
          <Link href="/">
            <Logo />
          </Link>
        </Box>
      </Flex>
    </Box>
  );
}
