import {
  Box,
  Stack,
  Heading,
  Text,
  Container,
  SimpleGrid,
} from '@chakra-ui/react';
import { PortfolioForm } from './Form';
import { headingLabels } from '@/constants';

const { title, subtitle, description } = headingLabels;

export default function Content() {
  return (
    <Box px={4} py={{ base: 10, sm: 20, lg: 24 }}>
      <Container
        as={SimpleGrid}
        maxW={'6xl'}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
      >
        <Stack spacing={10}>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }}
          >
            {title}
            <Text color="brand.main">{subtitle}</Text>
          </Heading>
          <Text color={'gray.500'} fontSize={{ base: 'sm' }}>
            {description}
          </Text>
        </Stack>
        <PortfolioForm />
      </Container>
    </Box>
  );
}
