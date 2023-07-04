import React, { ReactNode } from 'react';
import { Box, Text, VStack, HStack, Divider, Pressable } from 'native-base';
import { EntryMetaType } from '../../../../../../@types/EntryMetaType';
import { useNavigation } from '@react-navigation/native';
export function EntryMeta({
  entryMeta,
  children,
  onPressProp,
}: {
  entryMeta: EntryMetaType;
  children: ReactNode;
  onPressProp?: boolean;
}) {
  const navigation = useNavigation();
  const goToFormEntryScreen = () => {
    navigation.navigate('EntryMeta', {
      entryId: entryMeta.entry_id,
    });
  };
  return (
    <Pressable
      mb="5"
      bg="#fff"
      px="5"
      borderRadius="md"
      shadow={1}
      onPress={onPressProp ? goToFormEntryScreen : undefined}
      _pressed={
        onPressProp ? { backgroundColor: 'schemaPressed.900' } : undefined
      }
    >
      <VStack pt="5" pb="2">
        <VStack>
          <Text fontSize="md" bold color="mark.800">
            {entryMeta.label}
          </Text>
        </VStack>
        <VStack mt="2">{children}</VStack>
        <VStack mt="2">
          <Divider bg="mark.800" opacity="5" />
          <HStack mt="2" mb="5"></HStack>
        </VStack>
      </VStack>
    </Pressable>
  );
}
