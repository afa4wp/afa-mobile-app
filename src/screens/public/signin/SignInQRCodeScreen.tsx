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

export function SignInQRCodeScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const { handleLogin } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

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
      const result = await authService.signInQRCode(
        url + API_NAMESPACE,
        secrect
      );
      const { access_token, refresh_token, user_email } = result;
      setShowModal(false);
      handleLogin(access_token, refresh_token, url + API_NAMESPACE, user_email);
    } catch (error) {
      setShowModal(false);
      if (axios.isAxiosError(error)) {
        const response = error.response;
        if (response) {
          const { message } = response.data;
          alert(message);
        }
      } else {
        alert('something unexpected happened');
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
          alert('Invalid data format');
        }
      } catch (error) {
        alert('Error parsing scanned data');
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
          Requesting for camera permission
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
                No access to camera
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
              Request Acess
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
              Wordpress Admin {'>'} WP ALL Forms API {'>'} Settings {'>'}{' '}
              Generate QRCode
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
                color="mark.800"
              />
              <Text>Fazendo Login</Text>
            </HStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </Box>
  );
}
