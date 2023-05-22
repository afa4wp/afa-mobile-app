import { Pressable, Text, Icon, VStack, HStack } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import { ConfigurationItem as ConfigurationItemType } from '../../../@types/Configuration';

export function ConfigurationItem({
  label,
  iconName,
  vectorIcon = FontAwesome,
  onPress,
}: ConfigurationItemType) {
  return (
    <VStack>
      <Pressable onPress={onPress}>
        <HStack alignItems="center" py="2">
          <Icon
            as={vectorIcon}
            name={iconName}
            size="md"
            mr="5"
            color="mark.800"
          />
          <Text fontSize="lg" color="mark.800" flex={1}>
            {label}
          </Text>
        </HStack>
      </Pressable>
    </VStack>
  );
}
