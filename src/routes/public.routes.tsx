import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SigninStackScreen } from './public/SigninStackScreen';

const Stack = createNativeStackNavigator();

export default function PublicRoutes() {
    return (
        <Stack.Navigator
            screenOptions={{ 
                headerTitleStyle: {
                    color: '#383042',
                }
            }} 
        >
            <Stack.Screen 
                name="SignInStack"
                component={SigninStackScreen}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )

}