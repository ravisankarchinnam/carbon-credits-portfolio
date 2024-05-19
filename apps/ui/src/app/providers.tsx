'use client';

import { ChakraProvider } from '@chakra-ui/react';
import theme from '@/theme';
import { PortfolioProvider } from '@/contexts/PortfolioContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PortfolioProvider>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </PortfolioProvider>
  );
}
