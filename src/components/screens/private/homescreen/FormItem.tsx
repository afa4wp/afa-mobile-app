import { Pressable, Text, Divider, VStack } from 'native-base';

type PluginType = {
  label: string;
  onPress: () => void;
};

export function FormItem({ label, onPress }: PluginType) {
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
        </VStack>
        <Divider bg="rgba(124, 131, 219, 0.1)" />
      </Pressable>
    </VStack>
  );
}
