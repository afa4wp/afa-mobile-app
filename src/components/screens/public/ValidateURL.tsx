import {
  Box,
  VStack,
  Input,
  Text,
  Button,
  Center,
  InputGroup,
  InputLeftAddon,
  Stack,
  FormControl,
  Modal,
  HStack,
  Spinner,
  Heading,
} from 'native-base';
import { Platform } from 'react-native';
import { useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { API_NAMESPACE } from '../../../constants/endpoint';
import * as authService from '../../../services/auth';

const validationSchema = yup.object().shape({
  url: yup
    .string()
    .matches(
      /^(https?:\/\/)?([\w\d]+\.)?[\w\d]+\.\w+([/?#][^\s]*)?$/,
      'Please enter a valid URL'
    )
    .required('URL is required'),
});

export function ValidateURL({
  onData,
}: {
  onData: (data: { url: string; status: boolean }) => void;
}) {
  const [showModal, setShowModal] = useState(false);

  const formik = useFormik({
    initialValues: {
      url: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setShowModal(true);
      await checkWordPress(values.url);
      setShowModal(false);
    },
  });

  async function checkWordPress(url: string) {
    if (!url.startsWith('https://')) {
      url = 'https://' + url;
    }
    await checkPingRoute(url);
  }

  async function checkPingRoute(url: string) {
    const pingEndpoint = url + API_NAMESPACE;
    try {
      const data = await authService.pingRoute(pingEndpoint);
      if (data && typeof data === 'object' && data.ping === 'pong') {
        setShowModal(false);
        const data = { url, status: true };
        onData(data);
      }
    } catch (error) {
      formik.setErrors({
        url: 'Parece que voce não tem o plugin instalado no seu site.',
      });
    }
  }

  return (
    <Box px="5" flex={1}>
      <VStack py="5" flex={1}>
        <Text fontSize="md" color="mark.800">
          Digite o endereço do site Wordpress que você deseja connectar.
        </Text>
        <Stack mt="2">
          <FormControl
            isInvalid={formik.touched.url && formik.errors.url ? true : false}
          >
            <InputGroup w={{ base: '80%' }}>
              <InputLeftAddon children={'https://'} />
              <Input
                w={{ base: '100%' }}
                placeholder="Endereço do site"
                size="lg"
                style={inputStyle}
                onChangeText={formik.handleChange('url')}
              />
            </InputGroup>
            {formik.touched.url && formik.errors.url && (
              <FormControl.ErrorMessage>
                {formik.errors.url}
              </FormControl.ErrorMessage>
            )}
          </FormControl>
        </Stack>
        <VStack py="7">
          <Button
            size="lg"
            bg="mark.900"
            onPress={() => {
              formik.handleSubmit();
            }}
          >
            Continuar
          </Button>
        </VStack>
        <VStack mt="5" flex={1} justifyContent="flex-end">
          <Center>
            <Text color="mark.800" textAlign="center">
              Wordpress Admin {'>'} WP ALL Forms API {'>'} Settings {'>'}{' '}
              Generate QRCode
            </Text>
          </Center>
        </VStack>
      </VStack>
      <Modal isOpen={showModal} size="full" px="5">
        <Modal.Content maxWidth="100%">
          <Modal.Body px="0">
            <HStack space={2} px="2" py="4" alignItems="center">
              <Spinner
                size="lg"
                accessibilityLabel="Check plugin"
                color="mark.800"
              />
              <Text>Verificando o endereço do site</Text>
            </HStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </Box>
  );
}

const inputStyle = {
  height: Platform.OS === 'ios' ? 45 : undefined, // Set height to 40 only for iOS
};
