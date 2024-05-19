'use client';

import { Divider, Flex } from '@chakra-ui/react';
import { usePortfolio } from '@/contexts/PortfolioContext';
import Content from './Content';
import Table from './Table';

const PortfolioContent = () => {
  const { portfolio } = usePortfolio();
  return (
    <Flex direction="column" gap={6}>
      <Content />
      <Divider />
      {portfolio?.success && <Table portfolio={portfolio.data} />}
    </Flex>
  );
};

export default PortfolioContent;
