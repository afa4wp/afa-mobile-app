import React, { useState, useEffect } from 'react';
import { Box, VStack, Center, Button, Icon, Text } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { BarCodeScanner } from 'expo-barcode-scanner';
import { StyleSheet } from 'react-native';

export function SignInQRCodeScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  return (
    <Box flex={1} bg="mark.700" >
      <Box flex={1} mt="5" px="5">
        <VStack flex={1} borderRadius="md" bg="mark.900">
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        </VStack>
        <VStack my="5">
          <Center>
            <Text 
              color="mark.800"
              fontSize="md"
              bold
              textAlign="center"
              >
              Wordpress Admin {'>'} WP ALL Forms API {'>'} Settings {'>'} Generate QRCode
            </Text>
          </Center>
        </VStack>
        <VStack>
          <Button 
            size="lg"
            bg="mark.900"
            leftIcon={<Icon as={Ionicons} name="qr-code" size="md" />}
            >
                Scan
            </Button>
        </VStack>
      </Box>  
    </Box>
  );
}

