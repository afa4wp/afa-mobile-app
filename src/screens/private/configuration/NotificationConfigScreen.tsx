import { Box, ScrollView, VStack, Heading } from 'native-base';
import { NotificationConfigItem } from '../../../components/screens/private/configuration/NotificationConfigItem';
export function NotificationConfigScreen() {
  return (
    <Box safeArea flex={1} px="5" bg="mark.700">
      <ScrollView>
        <VStack mb="5">
          <Heading fontSize="xl" color="mark.800">
            Notificações de envio de formulários
          </Heading>
          <NotificationConfigItem label="Por push" isChecked={false} />
        </VStack>
        <VStack>
          <Heading fontSize="xl" color="mark.800">
            Notificações criação formulários
          </Heading>
          <NotificationConfigItem label="Por push" isChecked={false} />
        </VStack>
      </ScrollView>
    </Box>
  );
}
