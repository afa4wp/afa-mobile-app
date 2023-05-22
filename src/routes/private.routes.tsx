import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileScreen } from '../screens/private/profile/ProfileScreen';
import { AboutScreen } from '../screens/private/about/AboutScreen';
import { HomeTabs } from './private/HomeTabs';

const Stack = createNativeStackNavigator();

export default function PrivateRoutes() {
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
        options={{ title: 'Sobre' }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Perfil' }}
      />
    </Stack.Navigator>
  );
}
