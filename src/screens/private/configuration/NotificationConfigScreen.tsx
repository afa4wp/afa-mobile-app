import { Box, ScrollView, useToast, Text, Heading } from 'native-base';
import React, { useContext, useEffect, useState } from 'react';
import LanguageContext from '../../../context/LanguageContext';
import { CenterSpinner } from '../../../components/skeleton/CenterSpinner';
import * as notificationService from '../../../services/notificationSubscription';
import { NotificationSubscriptionType } from '../../../@types/NotificationSubscriptionType';
import { NotificationConfigItemMain } from '../../../components/screens/private/configuration/notification_config/NotificationConfigItemMain';
import NotificationContext from '../../../context/notification';
import ErrorMessageToast from '../../../components/general/ErrorMessageToast';

export function NotificationConfigScreen() {
  const { i18n } = useContext(LanguageContext)!;
  const { registerForPushNotificationsAsync } = useContext(NotificationContext);
  const [showSpinner, setShowSpinner] = useState(true);
  const [subscriptions, setSubscriptions] = useState<
    NotificationSubscriptionType[]
  >([]);
  const toast = useToast();

  async function getSubscriptions() {
    setShowSpinner(true);
    try {
      const expoPushToken = await registerForPushNotificationsAsync();
      const results = await notificationService.getSubscription(expoPushToken);
      setSubscriptions(results);
    } catch (error) {
      toast.show({
        render: () => {
          return (
            <ErrorMessageToast message={i18n.t('general.errorOccurred')} />
          );
        },
      });
    } finally {
      setShowSpinner(false);
    }
  }

  useEffect(() => {
    getSubscriptions();
  }, []);

  return (
    <Box safeArea flex={1} px="5" bg="mark.700">
      {!showSpinner ? (
        subscriptions.length > 0 ? (
          <ScrollView>
            {subscriptions.map((item, index) => {
              return (
                <NotificationConfigItemMain
                  key={index}
                  notificationSubscription={item}
                />
              );
            })}
          </ScrollView>
        ) : (
          <Box>
            <Heading color="mark.800">
              {i18n.t('screen.form.noFormsMessage')}
            </Heading>
          </Box>
        )
      ) : (
        <CenterSpinner />
      )}
    </Box>
  );
}
