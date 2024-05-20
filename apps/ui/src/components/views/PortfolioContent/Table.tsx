import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Th,
  Tbody,
  Tr,
  Td,
  Image,
  Box,
  Heading,
  Text,
} from '@chakra-ui/react';
import { formatPrice } from '@/utils/priceFormatter';
import { PortfolioCredit } from '@/types';
import { tableLabels } from '@/constants';

export default function PortfolioTable({
  portfolio,
}: {
  portfolio: PortfolioCredit[];
}) {
  const totalPrice = portfolio?.reduce(
    (acc, { allowed_volume_in_tons, price_per_ton }) =>
      acc + allowed_volume_in_tons * price_per_ton,
    0,
  );

  return (
    <Box maxWidth={'6xl'} my={0} mx="auto" w={'100%'} px={5}>
      <Heading as="h5" size="md" mt={1} mb={6}>
        {tableLabels.title}
      </Heading>
      {portfolio?.length ? (
        <TableContainer fontSize="sm">
          <Table>
            <TableCaption textAlign="right" color="black" fontSize="lg" px={8}>
              <b>{formatPrice(totalPrice!)}</b>
            </TableCaption>
            <Thead bg="white">
              <Tr>
                <Th px={1} py={5}></Th>
                <Th px={1} py={5}>
                  Project
                </Th>
                <Th px={1} py={5}>
                  Supplier
                </Th>
                <Th px={1} py={5}>
                  Percentage
                </Th>
                <Th px={1} py={5}>
                  Price ($/t)
                </Th>
                <Th px={1} py={5}>
                  Volume (t)
                </Th>
                <Th px={1} py={5}>
                  Total
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {portfolio?.map(
                ({
                  _id,
                  image,
                  name,
                  supplier_name,
                  distribution_weight,
                  price_per_ton,
                  allowed_volume_in_tons,
                }) => (
                  <Tr key={_id}>
                    <Td px={1} pb={0}>
                      <Box
                        position="relative"
                        borderLeftWidth={6}
                        borderStyle="solid"
                        borderColor="brand.main"
                        width={150}
                        height={20}
                      >
                        <Image
                          src={image}
                          alt={name}
                          width={'100%'}
                          height={'100%'}
                          objectFit="cover"
                          objectPosition="center"
                        />
                      </Box>
                    </Td>
                    <Td px={1} pb={0}>
                      {name}
                    </Td>
                    <Td px={1} pb={0}>
                      {supplier_name}
                    </Td>
                    <Td px={1} pb={0}>
                      {distribution_weight * 100}%
                    </Td>
                    <Td px={1} pb={0}>
                      {formatPrice(price_per_ton)}
                    </Td>
                    <Td px={1} pb={0}>
                      {allowed_volume_in_tons}
                    </Td>
                    <Td px={1} pb={0}>
                      <b>
                        {formatPrice(allowed_volume_in_tons * price_per_ton)}
                      </b>
                    </Td>
                  </Tr>
                ),
              )}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <Text size="md">{tableLabels.noData}</Text>
      )}
    </Box>
  );
}
