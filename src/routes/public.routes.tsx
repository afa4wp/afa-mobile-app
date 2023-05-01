import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignInScreen } from '../screens/public/SignInScreen'; 

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
                name="SignIn"
                component={SignInScreen}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )

}