import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  VStack,
  Center,
  Button,
  Icon,
  Text,
  Modal,
  HStack,
  Spinner,
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { StyleSheet } from 'react-native';
import * as authService from '../../../services/auth';
import { API_NAMESPACE } from '../../../constants/endpoint';
import AuthContext from '../../../context/AuthContext';
import axios from 'axios';
import LanguageContext from '../../../context/LanguageContext';
import { sanitizeEndpoint } from '../../../helpers/manipulateString';
import NotificationContext from '../../../context/notification';
import * as deviceService from '../../../services/device';
import { getOrCreateDeviceId } from '../../../helpers/secureStore';

export function SignInQRCodeScreen() {
  const { i18n, locale } = useContext(LanguageContext)!;
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const { handleLogin } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const { registerForPushNotificationsAsync } = useContext(NotificationContext);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const signIn = async (url: string, secrect: string) => {
    setShowModal(true);
    try {
      const endPoint = sanitizeEndpoint(url + API_NAMESPACE);
      const result = await authService.signInQRCode(endPoint, secrect);
      const { access_token, refresh_token, user_email } = result;

      const expoPushToken = await registerForPushNotificationsAsync();
      if (expoPushToken) {
        const device_id = await getOrCreateDeviceId();

        const data = {
          expo_token: expoPushToken,
          device_id: device_id,
          device_language: locale,
        };
        await deviceService.register(endPoint, data, access_token);
      }
      setShowModal(false);
      handleLogin(access_token, refresh_token, endPoint, user_email);
    } catch (error) {
      setShowModal(false);
      if (axios.isAxiosError(error)) {
        const response = error.response;
        if (response) {
          const { message } = response.data;
          alert(message);
        }
      } else {
        alert(i18n.t('screen.siginQRCode.errors.unexpectedError'));
      }
    }
  };

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    if (type === BarCodeScanner.Constants.BarCodeType.qr) {
      try {
        // Parse the data string into a JSON object
        const result = JSON.parse(data);

        // Use the result object as needed
        if (
          result.secret &&
          result.url &&
          result.secret.trim() !== '' &&
          result.url.trim() !== ''
        ) {
          await signIn(result.url, result.secret);
        } else {
          alert(i18n.t('screen.siginQRCode.errors.invalidDataFormat'));
        }
      } catch (error) {
        alert(i18n.t('screen.siginQRCode.errors.errorParsingData'));
      }
    }
  };

  const scanner = () => {
    if (hasPermission === false) {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }
  };

  if (hasPermission === null) {
    return (
      <Box flex={1} my="10" px="5" bg="mark.700">
        <Text color="mark.800" fontSize="md" bold textAlign="center">
          {i18n.t('screen.siginQRCode.errors.cameraPermission')}
        </Text>
      </Box>
    );
  }

  if (hasPermission === false) {
    return (
      <Box flex={1} bg="mark.700">
        <Box flex={1} my="5" px="5">
          <VStack my="5">
            <Center>
              <Text color="mark.800" fontSize="md" bold textAlign="center">
                {i18n.t('screen.siginQRCode.errors.noAccessToCamera')}
              </Text>
            </Center>
          </VStack>
          <VStack>
            <Button
              size="lg"
              bg="mark.900"
              leftIcon={<Icon as={Ionicons} name="camera" size="md" />}
              onPress={() => {
                scanner();
              }}
            >
              {i18n.t('screen.siginQRCode.requestAccess')}
            </Button>
          </VStack>
        </Box>
      </Box>
    );
  }
  return (
    <Box flex={1} bg="mark.700">
      <Box flex={1} my="5" px="5">
        <VStack flex={1} borderRadius="md" bg="mark.900">
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={[StyleSheet.absoluteFillObject]}
          />
        </VStack>
        <VStack my="5">
          <Center>
            <Text color="mark.800" fontSize="md" bold textAlign="center">
              {i18n.t('screen.sigin.wordpressAdmin')} {'>'} WPAFA {'>'}{' '}
              {i18n.t('screen.sigin.settings')} {'>'}{' '}
              {i18n.t('screen.profile.login')}
            </Text>
          </Center>
        </VStack>
        <VStack>
          <Button
            size="lg"
            bg="mark.900"
            leftIcon={<Icon as={Ionicons} name="qr-code" size="md" />}
            onPress={() => {
              setScanned(false);
            }}
          >
            Scan
          </Button>
        </VStack>
      </Box>
      <Modal isOpen={showModal} size="full" px="5">
        <Modal.Content maxWidth="100%">
          <Modal.Body px="0">
            <HStack space={2} px="2" py="4" alignItems="center">
              <Spinner
                size="lg"
                accessibilityLabel="Check plugin"
                color="mark.900"
              />
              <Text>
                {i18n.t('screen.siginCredentials.credentials.loggingIn')}
              </Text>
            </HStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </Box>
  );
}
