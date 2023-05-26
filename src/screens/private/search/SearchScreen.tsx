import {
  Heading,
  Box,
  HStack,
  VStack,
  Input,
  Icon,
  Button,
  Center,
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Platform } from 'react-native';

export function SearchScreen() {
  const [activateBriefingSearch, setActivateBriefingSearch] = useState(true);
  const [activateAnswerSearch, setActivateAnswerSearch] = useState(false);
  const [activateCostomerSearch, setActivateCostomerSearch] = useState(false);

  return (
    <Box safeArea flex={1} bg="mark.700" px="5">
      <Box flex={1}>
        <Box>
          <VStack>
            <Input
              placeholder="Pesquisar"
              fontSize="sm"
              style={inputStyle}
              InputLeftElement={
                <Icon
                  ml="2"
                  size="lg"
                  color="mark.900"
                  as={<Ionicons name="ios-search" />}
                />
              }
            />
            <HStack mt="2" space="2">
              <Button
                variant={!activateBriefingSearch ? 'outline' : undefined}
                bg={activateBriefingSearch ? 'mark.800' : 'mark.700'}
                _text={{
                  color: activateBriefingSearch ? 'mark.700' : 'mark.800',
                }}
              >
                Formulario
              </Button>
              <Button
                variant={!activateAnswerSearch ? 'outline' : undefined}
                bg={activateAnswerSearch ? 'mark.800' : 'mark.700'}
                _text={{
                  color: activateAnswerSearch ? 'mark.700' : 'mark.800',
                }}
              >
                Resposta
              </Button>
              <Button
                variant={!activateCostomerSearch ? 'outline' : undefined}
                bg={activateCostomerSearch ? 'mark.800' : 'mark.700'}
                _text={{
                  color: activateCostomerSearch ? 'mark.700' : 'mark.800',
                }}
              >
                Cliente
              </Button>
            </HStack>
          </VStack>
        </Box>
        <Box>
          <Heading color="mark.800" size="md" mt="4">
            Pesquise por formulários, cliente ou alguma resposta.
          </Heading>
        </Box>
      </Box>
    </Box>
  );
}

const inputStyle = {
  height: Platform.OS === 'ios' ? 45 : undefined, // Set height to 40 only for iOS
};
