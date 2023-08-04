import { Box, ScrollView, VStack, Heading, useToast, Text } from 'native-base';
import { NotificationConfigItem } from './NotificationConfigItem';
import React, { useContext } from 'react';
import LanguageContext from '../../../../../context/LanguageContext';
import { NotificationSubscriptionType } from '../../../../../@types/NotificationSubscriptionType';

export function FormSubmission({
  notificationSubscription,
}: {
  notificationSubscription: NotificationSubscriptionType;
}) {
  const { i18n } = useContext(LanguageContext)!;

  return (
    <VStack mb="5">
      <Heading fontSize="xl" color="mark.800">
        {i18n.t('screen.notificationConfiguration.formSubmissionNotifications')}
      </Heading>
      <NotificationConfigItem
        label={i18n.t('screen.notificationConfiguration.byPush')}
        isChecked={false}
      />
    </VStack>
  );
}
