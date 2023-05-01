import { NativeBaseProvider } from "native-base";
import Routes from './src/routes/index'
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer >
        <Routes/>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
