import { Box, Spinner, Center, Heading } from 'native-base';

export function SearchNotFound({ searchContent }: { searchContent: string }) {
  return (
    <Box flex={1}>
      <Center>
        <Heading color="mark.800" size="md">
          Nenhum resultado para: "{searchContent}"
        </Heading>
      </Center>
    </Box>
  );
}
