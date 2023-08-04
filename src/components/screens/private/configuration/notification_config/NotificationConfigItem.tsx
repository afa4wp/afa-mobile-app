import {
  Text,
  VStack,
  HStack,
  Divider,
  Switch,
  ISwitchProps,
} from 'native-base';
import { Platform } from 'react-native';

interface NotificationConfigItemProps extends ISwitchProps {
  label: string;
  hideDivider?: boolean;
}
export function NotificationConfigItem({
  label,
  hideDivider = false,
  ...props
}: NotificationConfigItemProps) {
  const isIOS = Platform.OS === 'ios';
  return (
    <VStack>
      <HStack
        alignItems="center"
        py="2"
        mt={isIOS ? '2' : undefined}
        mb={isIOS ? '2' : undefined}
        justifyContent="space-between"
      >
        <Text fontSize="md" color="mark.800">
          {label}
        </Text>
        <Switch size="md" {...props} />
      </HStack>
      {!hideDivider && <Divider bg="rgba(124, 131, 219, 0.1)" />}
    </VStack>
  );
}
