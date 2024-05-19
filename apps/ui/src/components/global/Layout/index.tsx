import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Box } from '@chakra-ui/react';

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <Box
        as="main"
        bg="blackAlpha.50"
        minHeight={'calc(100vh - 214px)'}
        pb={12}
      >
        {children}
      </Box>
      <Footer />
    </>
  );
};
