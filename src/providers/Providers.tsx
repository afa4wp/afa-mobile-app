import { NativeBaseProvider } from 'native-base';
import Routes from '../routes/index';
import { NavigationContainer } from '@react-navigation/native';
import { theme } from '../constants/theme';
import AuthProvider from './AuthProvider';
import LanguageProvider from './LanguageProvider';
export default function AppProviders() {
  return (
    <NativeBaseProvider theme={theme}>
      <LanguageProvider>
        <AuthProvider>
          <NavigationContainer>
            <Routes />
          </NavigationContainer>
        </AuthProvider>
      </LanguageProvider>
    </NativeBaseProvider>
  );
}
