export interface AxiosError {
  response?: {
    status?: number;
    data?: any;
  };
}

export type GeneratePortfolioInput = {
  volume: number;
};

export type PortfolioCredit = {
  _id: string;
  name: string;
  image: string;
  supplier_name: string;
  distribution_weight: number;
  price_per_ton: number;
  allowed_volume_in_tons: number;
};

export type PortfolioCreditResponse = {
  data: PortfolioCredit[];
  success: boolean;
} | null;
