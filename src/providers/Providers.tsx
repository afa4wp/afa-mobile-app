import { NativeBaseProvider } from 'native-base';
import Routes from '../routes/index';
import { theme } from '../constants/theme';
import AuthProvider from './AuthProvider';
import LanguageProvider from './LanguageProvider';
import { NotificationProvider } from '../context/notification';
export default function AppProviders() {
  return (
    <NativeBaseProvider theme={theme}>
      <LanguageProvider>
        <AuthProvider>
          <NotificationProvider>
            <Routes />
          </NotificationProvider>
        </AuthProvider>
      </LanguageProvider>
    </NativeBaseProvider>
  );
}
