'use client';

import { createContext, useContext, ReactNode, useState } from 'react';
import portfolioService from '@/services/portfolioService';
import {
  AxiosError,
  GeneratePortfolioInput,
  PortfolioCreditResponse,
} from '@/types';
import { useToast } from '@chakra-ui/react';
import { globalError } from '@/constants';

interface PortfolioContextType {
  isLoading: boolean;
  generatePortfolio: ({ volume }: GeneratePortfolioInput) => Promise<void>;
  portfolio: PortfolioCreditResponse;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(
  undefined,
);

interface PortfolioProviderProps {
  children: ReactNode;
}

export const PortfolioProvider = ({ children }: PortfolioProviderProps) => {
  const [portfolio, setPortfolio] = useState<PortfolioCreditResponse>(null);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const generatePortfolio = async ({ volume }: GeneratePortfolioInput) => {
    setIsLoading(true);
    try {
      const data = await portfolioService.generatePortfolio({ volume });
      setPortfolio(data);
      setIsLoading(false);
    } catch (error: unknown) {
      setIsLoading(false);
      const { error: title, message: description } =
        (error as AxiosError).response?.data ?? globalError;
      toast({
        title,
        description,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        generatePortfolio,
        portfolio,
        isLoading,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within an PortfolioProvider');
  }
  return context;
};
