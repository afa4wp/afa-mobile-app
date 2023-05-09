import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignInScreen } from '../../screens/public/signin/SignInScreen';
import { SignInQRCodeScreen } from '../../screens/public/signin/SignInQRCodeScreen';
import { SignInCredentialsScreen } from '../../screens/public/signin/SignInCredentialsScreen';

const SigninStack = createNativeStackNavigator();

export function SigninStackScreen() {
    return (
        <SigninStack.Navigator>
            <SigninStack.Screen  
                name = "SignIn" 
                component={SignInScreen}
                options={{ title: 'Sign In' }}
            
            />
            <SigninStack.Screen  
                name = "SignInQRCode" 
                component={SignInQRCodeScreen}
                options={{ title: 'Sign in with QRCode' }}
                />
            <SigninStack.Screen  
                name = "SignInUserInfo" 
                component={SignInCredentialsScreen}
                options={{ title: 'Sign in with Credentials' }}
                />    
        </SigninStack.Navigator>
    );
  }