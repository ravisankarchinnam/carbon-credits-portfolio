import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { GeneratePortfolioInput } from '@/types';
import { usePortfolio } from '@/contexts/PortfolioContext';
import { formLabels } from '@/constants';

const {
  inputs: {
    volume: { errors },
  },
} = formLabels;

const schema = yup
  .object({
    volume: yup
      .number()
      .typeError(errors.typeError)
      .required(errors.required)
      .positive(errors.positive),
  })
  .required();

const defaultValues = {
  volume: undefined,
};

const useGeneratePortfolio = () => {
  const { generatePortfolio } = usePortfolio();
  const {
    handleSubmit,
    register,
    formState: { isLoading, errors, isSubmitting },
  } = useForm<GeneratePortfolioInput>({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  return {
    register,
    handleSubmit: handleSubmit(generatePortfolio),
    errors,
    isLoading: isSubmitting || isLoading,
  };
};

export default useGeneratePortfolio;
