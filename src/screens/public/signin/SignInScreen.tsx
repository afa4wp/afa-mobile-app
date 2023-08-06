import React, { useContext } from 'react';
import {
  Box,
  Center,
  VStack,
  Heading,
  Text,
  Button,
  Icon,
  ScrollView,
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import Welcome from '../../../assets/welcome.svg';
import { Ionicons } from '@expo/vector-icons';
import LanguageContext from '../../../context/LanguageContext';
import NotificationContext from '../../../context/notification';

export function SignInScreen() {
  const navigation = useNavigation();
  const { i18n } = useContext(LanguageContext)!;
  const { registerForPushNotificationsAsync } = useContext(NotificationContext);

  const permition = async (screen: string) => {
    const expoPushToken = await registerForPushNotificationsAsync();
    if (expoPushToken) {
      navigation.navigate(screen);
    }
  };

  return (
    <Box flex={1} bg="mark.700">
      <ScrollView flex={1} contentContainerStyle={{ flexGrow: 1 }}>
        <Box px="5" flex={1} justifyContent="center" py="2">
          <VStack mb="5">
            <Center>
              <Welcome width={273} height={184} />
            </Center>
          </VStack>
          <VStack py="5">
            <Center>
              <Heading color="mark.800" textAlign="center">
                {i18n.t('screen.sigin.loginPrompt')}
              </Heading>
            </Center>
          </VStack>
          <VStack mb="5">
            <Center>
              <Text color="mark.800" fontSize="lg" bold textAlign="center">
                {i18n.t('screen.sigin.content')}
              </Text>
            </Center>
          </VStack>
          <VStack mt="5">
            <Button
              size="lg"
              bg="mark.900"
              onPress={async () => {
                await permition('SignInQRCode');
              }}
              leftIcon={<Icon as={Ionicons} name="qr-code" size="md" />}
            >
              {i18n.t('screen.sigin.loginPromptQRCode')}
            </Button>
          </VStack>
          <VStack mt="5">
            <Button
              size="lg"
              variant="outline"
              onPress={async () => {
                await permition('SignInUserInfo');
              }}
            >
              {i18n.t('screen.sigin.loginPromptCredentials')}
            </Button>
          </VStack>
        </Box>
      </ScrollView>
    </Box>
  );
}
