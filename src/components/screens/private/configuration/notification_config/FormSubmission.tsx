import { VStack, Heading } from 'native-base';
import { NotificationConfigItem } from './NotificationConfigItem';
import React, { useContext, useState } from 'react';
import LanguageContext from '../../../../../context/LanguageContext';
import { NotificationSubscriptionType } from '../../../../../@types/NotificationSubscriptionType';
import * as notificationService from '../../../../../services/notificationSubscription';
import { updateSingleStateInServer } from '../../../../../helpers/notificationSubscription';

export function FormSubmission({
  notificationSubscription,
}: {
  notificationSubscription: NotificationSubscriptionType;
}) {
  const { i18n } = useContext(LanguageContext)!;
  const [isChecked, setIsChecked] = useState(
    notificationSubscription.enabled == 1
  );

  return (
    <VStack mb="5">
      <Heading fontSize="xl" color="mark.800">
        {i18n.t('screen.notificationConfiguration.formSubmissionNotifications')}
      </Heading>
      <NotificationConfigItem
        label={i18n.t('screen.notificationConfiguration.byPush')}
        isChecked={isChecked}
        onToggle={() => {
          updateSingleStateInServer(
            notificationSubscription.id,
            isChecked,
            setIsChecked
          );
        }}
      />
    </VStack>
  );
}
