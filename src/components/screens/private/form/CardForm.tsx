import {
  Heading,
  Center,
  Box,
  Text,
  Link,
  VStack,
  HStack,
  Button,
  Icon,
  IconButton,
  Pressable,
} from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import { FormType } from '../../../../@types/FormType';
import { ShareButton } from './ShareButton';

export function CardForm({ form }: { form: FormType }) {
  return (
    <Pressable
      p="2"
      mt="5"
      rounded="lg"
      shadow="1"
      borderRadius="md"
      borderColor="#E1E1E2"
      borderWidth="1"
      _light={{
        backgroundColor: '#fff',
      }}
    >
      <VStack mb="4">
        <Heading color="mark.800" size="md">
          {form.title}
        </Heading>
      </VStack>
      <VStack mb="2">
        <HStack justifyContent="space-between" alignItems="center">
          <HStack>
            <Text fontSize="sm" color="mark.800">
              {' '}
              6 meses atras{' '}
            </Text>
          </HStack>
          <HStack>
            <HStack alignItems="center">
              <Icon
                as={FontAwesome}
                name="folder"
                size="sm"
                mr="1"
                color="mark.800"
              />
            </HStack>
            <HStack>
              <Text color="mark.800">2</Text>
            </HStack>
          </HStack>
        </HStack>
      </VStack>
      <VStack>
        <HStack justifyContent="space-between" alignItems="center">
          <HStack>
            <Text fontSize="sm" color="mark.800">
              Criado por
            </Text>
          </HStack>
          <HStack alignItems="center">
            <ShareButton />
          </HStack>
        </HStack>
      </VStack>
    </Pressable>
  );
}
