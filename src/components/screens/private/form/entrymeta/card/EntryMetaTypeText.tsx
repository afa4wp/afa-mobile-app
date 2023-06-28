import {
  Box,
  Text,
  VStack,
  HStack,
  Divider,
  IconButton,
  QuestionIcon,
} from 'native-base';
import { EntryMetaType } from '../../../../../../@types/EntryMetaType';

export function EntryMetaTypeText({ entryMeta }: { entryMeta: EntryMetaType }) {
  console.log(entryMeta);
  return (
    <Box mb="5" bg="#fff" px="5" borderRadius="md" shadow={1}>
      <VStack pt="5" pb="2">
        <VStack>
          <Text fontSize="md" bold color="mark.800">
            {entryMeta.label}
          </Text>
        </VStack>
        <VStack mt="2">
          <Text fontSize="md" color="mark.800">
            {entryMeta.meta_value}{' '}
          </Text>
        </VStack>
        <VStack mt="2">
          <Divider bg="mark.800" opacity="5" />
          <HStack mt="2" mb="5"></HStack>
        </VStack>
      </VStack>
    </Box>
  );
}
