import { Text, VStack } from 'native-base';
export function RegistrationDataProfile({
  label,
  value,
  hasBorder = true,
}: {
  label: string;
  value: string;
  hasBorder?: boolean;
}) {
  const borderBottomColor = hasBorder ? 'rgba(124, 131, 219, 0.1)' : undefined;
  const borderBottomWidth = hasBorder ? 1 : undefined;
  return (
    <VStack
      mb="2"
      borderBottomWidth={borderBottomWidth}
      borderBottomColor={borderBottomColor}
      py="2"
    >
      <VStack mb="2">
        <VStack mb="2">
          <Text fontSize="md" color="mark.800">
            {label}
          </Text>
        </VStack>
        <VStack>
          <Text fontSize="md" color="mark.800" bold>
            {value}
          </Text>
        </VStack>
      </VStack>
    </VStack>
  );
}
