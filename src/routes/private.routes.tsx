import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileScreen } from '../screens/private/profile/ProfileScreen';
import { AboutScreen } from '../screens/private/about/AboutScreen';
import { HomeTabs } from './private/HomeTabs';
import LanguageContext from '../context/LanguageContext';

const Stack = createNativeStackNavigator();

export default function PrivateRoutes() {
  const { i18n } = useContext(LanguageContext)!;
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          color: '#383042',
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeTabs}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{ title: i18n.t('screen.headTitle.about') }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: i18n.t('screen.headTitle.profile') }}
      />
    </Stack.Navigator>
  );
}
