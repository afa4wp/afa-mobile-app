import { Box, ScrollView, useToast, Text, Heading } from 'native-base';
import React, { useContext, useEffect, useState } from 'react';
import LanguageContext from '../../../context/LanguageContext';
import { CenterSpinner } from '../../../components/skeleton/CenterSpinner';
import * as notificationService from '../../../services/notificationSubscription';
import { NotificationSubscriptionType } from '../../../@types/NotificationSubscriptionType';
import { NotificationConfigItemMain } from '../../../components/screens/private/configuration/notification_config/NotificationConfigItemMain';

export function NotificationConfigScreen() {
  const { i18n } = useContext(LanguageContext)!;
  const [showSpinner, setShowSpinner] = useState(true);
  const [subscriptions, setSubscriptions] = useState<
    NotificationSubscriptionType[]
  >([]);
  const toast = useToast();

  async function getSubscriptions() {
    setShowSpinner(true);
    try {
      const results = await notificationService.getSubscription(
        'ExponentPushToken[2xxxxxxxxxxxxxxxxxxxxx]'
      );
      setSubscriptions(results);
    } catch (error) {
      toast.show({
        render: () => {
          return (
            <Box bg="mark.900" px="2" py="1" rounded="sm" mb={5}>
              <Text color="mark.700" fontSize="md">
                {i18n.t('screen.siginCredentials.credentials.errorOccurred')}
              </Text>
            </Box>
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
