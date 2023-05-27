import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LanguageContext from '../../context/LanguageContext';
import React, { useContext } from 'react';
import { ConfigurationScreen } from '../../screens/private/configuration/ConfigurationScreen';
import { NotificationConfigScreen } from '../../screens/private/configuration/NotificationConfigScreen';

const ConfigurationStack = createNativeStackNavigator();

export function ConfigurationStackScreen() {
  const { i18n } = useContext(LanguageContext)!;
  return (
    <ConfigurationStack.Navigator>
      <ConfigurationStack.Screen
        name="Configuration"
        component={ConfigurationScreen}
        options={{ title: i18n.t('screen.headTitle.configurations') }}
      />
      <ConfigurationStack.Screen
        name="NotificationConfig"
        component={NotificationConfigScreen}
        options={{
          title: i18n.t('screen.headTitle.notificationConfiguration'),
        }}
      />
    </ConfigurationStack.Navigator>
  );
}
