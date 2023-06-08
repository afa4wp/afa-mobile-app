import { Pressable, Text, Icon, VStack, HStack } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import { ConfigurationItem as ConfigurationItemType } from '../../../../@types/Configuration';

export function ConfigurationItem({
  label,
  iconName,
  hasBorder = true,
  vectorIcon = FontAwesome,
  onPress,
}: ConfigurationItemType) {
  const borderBottomColor = hasBorder ? 'rgba(124, 131, 219, 0.1)' : undefined;
  const borderBottomWidth = hasBorder ? 1 : undefined;

  return (
    <VStack
      borderBottomWidth={borderBottomWidth}
      borderBottomColor={borderBottomColor}
    >
      <Pressable
        onPress={onPress}
        _pressed={{
          backgroundColor: 'schemaPressed.900',
        }}
      >
        <VStack>
          <HStack alignItems="center">
            <HStack py="5">
              <Icon
                as={FontAwesome}
                name={iconName}
                size="md"
                mr="3"
                color="mark.800"
              />
            </HStack>
            <HStack
              justifyContent="space-between"
              alignItems="center"
              flex={1}
              py="5"
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
