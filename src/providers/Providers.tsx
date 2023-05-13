import { NativeBaseProvider } from 'native-base';
import Routes from '../routes/index';
import { NavigationContainer } from '@react-navigation/native';
import { theme } from '../constants/theme';

export default function AppProviders() {
  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
