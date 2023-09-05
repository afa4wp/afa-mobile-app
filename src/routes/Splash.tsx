import React from 'react';
import { HStack, Box, Spinner, Image } from 'native-base';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
const Splash = () => (
  <Box safeArea flex={1} bg="mark.700">
    <HStack flex={1} justifyContent="center" alignItems="center">
      <Spinner color="mark.900" size="lg" />
    </HStack>
  </Box>
);

export default () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Splash" component={Splash} />
    </Stack.Navigator>
  );
};
