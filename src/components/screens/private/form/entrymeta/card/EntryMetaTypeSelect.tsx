import {
  Box,
  Checkbox,
  Text,
  VStack,
  HStack,
  Divider,
  Pressable,
} from 'native-base';
import { EntryMetaType } from '../../../../../../@types/EntryMetaType';
import { useEffect, useState } from 'react';

export function EntryMetaTypeSelect({
  entryMeta,
}: {
  entryMeta: EntryMetaType;
}) {
  const [metaValueArray, setMetaValueArray] = useState<string[]>([]);
  const [checkvalue, setCheckvalue] = useState(true);
  useEffect(() => {
    if (Array.isArray(entryMeta.meta_value)) {
      setMetaValueArray(entryMeta.meta_value as string[]);
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
          {metaValueArray.map((item, index) => (
            <Checkbox
              isDisabled
              key={index}
              value="one"
              my={2}
              defaultIsChecked={checkvalue}
              colorScheme="schemahelper"
            >
              {item}
            </Checkbox>
          ))}
        </VStack>
        <VStack mt="2">
          <Divider bg="mark.800" opacity="5" />
          <HStack mt="2" mb="5"></HStack>
        </VStack>
      </VStack>
    </Pressable>
  );
}
