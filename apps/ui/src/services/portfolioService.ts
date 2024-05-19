import { GeneratePortfolioInput } from '@/types';
import apiClient from './apiClient';

const portfolioService = {
  async generatePortfolio({ volume }: GeneratePortfolioInput) {
    const response = await apiClient.post('/portfolio/generate', { volume });
    return response.data;
  },
};

export default portfolioService;
