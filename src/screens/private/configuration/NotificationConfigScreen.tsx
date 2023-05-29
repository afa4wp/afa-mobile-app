import { Box, ScrollView, VStack, Heading } from 'native-base';
import { NotificationConfigItem } from '../../../components/screens/private/configuration/NotificationConfigItem';
import React, { useContext } from 'react';
import LanguageContext from '../../../context/LanguageContext';
export function NotificationConfigScreen() {
  const { i18n } = useContext(LanguageContext)!;
  return (
    <Box safeArea flex={1} px="5" bg="mark.700">
      <ScrollView>
        <VStack mb="5">
          <Heading fontSize="xl" color="mark.800">
            {i18n.t(
              'screen.notificationConfiguration.formSubmissionNotifications'
            )}
          </Heading>
          <NotificationConfigItem
            label={i18n.t('screen.notificationConfiguration.byPush')}
            isChecked={false}
          />
        </VStack>
        <VStack>
          <Heading fontSize="xl" color="mark.800">
            {i18n.t(
              'screen.notificationConfiguration.formCreationNotifications'
            )}
          </Heading>
          <NotificationConfigItem
            label={i18n.t('screen.notificationConfiguration.byPush')}
            isChecked={false}
          />
        </VStack>
      </ScrollView>
    </Box>
  );
}
