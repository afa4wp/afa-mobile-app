import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignInScreen } from '../../screens/public/signin/SignInScreen';
import { SignInQRCodeScreen } from '../../screens/public/signin/SignInQRCodeScreen';
import { SignInUserInfoScreen } from '../../screens/public/signin/SignInUserInfoScreen';

const SigninStack = createNativeStackNavigator();

export function SigninStackScreen() {
    return (
        <SigninStack.Navigator>
            <SigninStack.Screen  
                name = "SignIn" 
                component={SignInScreen}
                options={{ title: 'Sign in' }}
            
            />
            <SigninStack.Screen  
                name = " SignInQRCode" 
                component={SignInQRCodeScreen}
                options={{ title: 'Sign in with QRCode' }}
                />
            <SigninStack.Screen  
                name = "SignInUserInfo" 
                component={SignInUserInfoScreen}
                options={{ title: 'Sign in with Credentials' }}
                />    
        </SigninStack.Navigator>
    );
  }