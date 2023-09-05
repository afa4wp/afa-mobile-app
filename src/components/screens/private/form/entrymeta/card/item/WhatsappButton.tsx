import { Pressable, Text, Icon, VStack, HStack } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';

export function WhatsappButton({ label }: { label: string | null }) {
  return (
    <VStack>
      <Pressable
        _pressed={{
          backgroundColor: 'schemaPressed.900',
        }}
      >
        <VStack>
          <HStack alignItems="center">
            <HStack py="3">
              <Icon
                as={FontAwesome}
                name="whatsapp"
                size="md"
                mr="3"
                color="mark.800"
              />
            </HStack>
            <HStack
              justifyContent="space-between"
              alignItems="center"
              flex={1}
              py="3"
            >
              <HStack>
                <Text fontSize="md" color="mark.800">
                  {label}
                </Text>
              </HStack>
            </HStack>
          </HStack>
        </VStack>
      </Pressable>
    </VStack>
  );
}
