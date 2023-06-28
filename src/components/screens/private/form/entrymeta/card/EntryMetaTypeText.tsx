import { Box, Text, VStack, HStack, Divider, Pressable } from 'native-base';
import { EntryMetaType } from '../../../../../../@types/EntryMetaType';
import { useEffect, useState } from 'react';
export function EntryMetaTypeText({ entryMeta }: { entryMeta: EntryMetaType }) {
  const [metaValueString, setMetaValueString] = useState<string | null>(null);

  useEffect(() => {
    if (
      typeof entryMeta.meta_value === 'string' ||
      typeof entryMeta.meta_value === 'number'
    ) {
      setMetaValueString(entryMeta.meta_value);
    }
  }, [entryMeta.meta_value]);

  return (
    <Pressable
      mb="5"
      bg="#fff"
      px="5"
      borderRadius="md"
      shadow={1}
      _pressed={{
        backgroundColor: 'schemaPressed.900',
      }}
    >
      <VStack pt="5" pb="2">
        <VStack>
          <Text fontSize="md" bold color="mark.800">
            {entryMeta.label}
          </Text>
        </VStack>
        <VStack mt="2">
          <Text fontSize="md" color="mark.800">
            {metaValueString}
          </Text>
        </VStack>
        <VStack mt="2">
          <Divider bg="mark.800" opacity="5" />
          <HStack mt="2" mb="5"></HStack>
        </VStack>
      </VStack>
    </Pressable>
  );
}
