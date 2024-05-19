'use client';

import {
  Stack,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Heading,
  Text,
} from '@chakra-ui/react';
import useGeneratePortfolio from '@/hooks/useGeneratePortfolio';
import { formLabels } from '@/constants';

const {
  title,
  description,
  inputs: { volume },
  button,
} = formLabels;

export const PortfolioForm = () => {
  const { register, handleSubmit, errors, isLoading } = useGeneratePortfolio();

  return (
    <Stack
      bg="white"
      rounded={'3xl'}
      p={{ base: 4, sm: 6, md: 8 }}
      spacing={{ base: 8 }}
      maxW={{ lg: 'lg' }}
      shadow="2xl"
    >
      <Stack spacing={4}>
        <Heading
          color={'gray.800'}
          lineHeight={1.1}
          fontSize={{ base: '2xl', sm: '3xl' }}
        >
          {title}
        </Heading>
        <Text color={'gray.500'} fontSize={{ base: 'sm' }}>
          {description}
        </Text>
      </Stack>
      <Stack as={'form'} mt={1} onSubmit={handleSubmit}>
        <FormControl isInvalid={!!errors?.volume}>
          <Input
            id={volume.id}
            placeholder={volume.placeholder}
            {...register('volume')}
            focusBorderColor="gray.600"
            errorBorderColor="crimson"
            disabled={isLoading}
          />
          {errors.volume && (
            <FormErrorMessage>
              <span>{errors.volume.message as string}</span>
            </FormErrorMessage>
          )}
        </FormControl>
        <Button
          mt={8}
          w={'full'}
          bg="gray.700"
          color="white"
          _hover={{ bg: 'gray.800' }}
          type="submit"
          isLoading={isLoading}
        >
          {button.label}
        </Button>
      </Stack>
    </Stack>
  );
};
