import { NativeBaseProvider } from "native-base";
import Routes from './src/routes/index'
import { NavigationContainer } from '@react-navigation/native';
import { theme } from "./src/constants/theme"

export default function App() {
  return (
    <NativeBaseProvider theme = {theme}>
      <NavigationContainer >
        <Routes/>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
