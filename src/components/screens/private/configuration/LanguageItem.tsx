import { Pressable, Text, Divider, VStack } from 'native-base';
import { LanguageItemType } from '../../../../@types/LanguageTypes';
export function LanguageItem({
  label,
  originalLabel,
  onPress,
}: LanguageItemType) {
  return (
    <VStack>
      <Pressable
        onPress={onPress}
        _pressed={{
          backgroundColor: 'schemaPressed.900',
        }}
      >
        <VStack py="4" px="4">
          <VStack>
            <Text fontSize="md" color="mark.800">
              {label}
            </Text>
          </VStack>
          <VStack>
            <Text fontSize="sm" color="mark.800">
              {originalLabel}
            </Text>
          </VStack>
        </VStack>
        <Divider bg="rgba(124, 131, 219, 0.1)" />
      </Pressable>
    </VStack>
  );
}
