import { Text, VStack, HStack, Icon, Divider } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
export function ItemStatisticProfile({
  label,
  value,
  iconName,
}: {
  label: string;
  value: string;
  iconName: string;
}) {
  return (
    <VStack mb="2">
      <HStack alignItems="center">
        <HStack>
          <Icon
            as={FontAwesome}
            name={iconName}
            size="md"
            mr="5"
            color="mark.800"
          />
        </HStack>
        <HStack
          justifyContent="space-between"
          alignItems="center"
          flex={1}
          borderBottomWidth={1}
          borderBottomColor="rgba(124, 131, 219, 0.1)"
          py="3"
        >
          <HStack>
            <Text fontSize="md" color="mark.800">
              {label}
            </Text>
          </HStack>
          <HStack>
            <HStack>
              <Text fontSize="md" color="mark.800">
                {value}
              </Text>
            </HStack>
          </HStack>
        </HStack>
      </HStack>
    </VStack>
  );
}
