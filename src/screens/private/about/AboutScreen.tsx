import {
  Box,
  ScrollView,
  VStack,
  Heading,
  Text,
  Flex,
  Center,
} from 'native-base';
import Constants from 'expo-constants';

export function AboutScreen() {
  const appVersion = Constants.manifest?.version ?? 'Unknown';
  return (
    <Box safeArea flex={1} bg="mark.700" px="5">
      <ScrollView>
        <VStack>
          <Heading color="mark.900">
            Queremos te ajudar a ficar por dentro de todos os seus formulários
          </Heading>
        </VStack>
        <VStack mt="4">
          <Text fontSize="md" color="mark.800">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti
            doloribus, et sed voluptate minus itaque fugit eveniet corrupti in.
            Quo ratione corrupti iusto hic corporis recusandae quas repellat
            explicabo distinctio?
          </Text>
          <Text fontSize="md" color="mark.800" mt="4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A saepe
            voluptatum, error ab doloribus debitis voluptas ratione tenetur
            fugiat id rem, veritatis magnam.
          </Text>
          <Text fontSize="md" color="mark.800" mt="4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum
            similique officiis eos deserunt sequi aspernatur ad nemo
            reprehenderit.
          </Text>
        </VStack>
        <Flex flex={1} direction="column-reverse" mt="4">
          <Center pb="4">
            <Text color="mark.800" fontSize="sm">
              App Version: {appVersion}
            </Text>
          </Center>
        </Flex>
      </ScrollView>
    </Box>
  );
}
