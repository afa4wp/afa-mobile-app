import React, { useContext } from 'react';
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
} from 'native-base';
import { Platform } from 'react-native';
import { useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { API_NAMESPACE, WP_REST } from '../../../constants/endpoint';
import * as authService from '../../../services/auth';
import LanguageContext from '../../../context/LanguageContext';
import { sanitizeEndpoint } from '../../../helpers/manipulateString';

export function ValidateURL({
  onData,
}: {
  onData: (data: { url: string; status: boolean }) => void;
}) {
  const [showModal, setShowModal] = useState(false);
  const { i18n } = useContext(LanguageContext)!;

  const validationSchema = yup.object().shape({
    url: yup
      .string()
      .matches(
        /^(https?:\/\/)?([\w\d]+\.)?[\w\d]+\.\w+([/?#][^\s]*)?$/,
        i18n.t('screen.siginCredentials.validateURL.pleaseEnterValidURL')
      )
      .required(
        i18n.t('screen.siginCredentials.validateURL.urlIsRequiredError')
      ),
  });

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
    const pingEndpoint = sanitizeEndpoint(url + WP_REST + API_NAMESPACE);
    try {
      const data = await authService.pingRoute(pingEndpoint);
      if (data && typeof data === 'object' && data.ping === 'pong') {
        setShowModal(false);
        const data = { url, status: true };
        onData(data);
      }
    } catch (error) {
      formik.setErrors({
        url: i18n.t('screen.siginCredentials.validateURL.pluginNotInstalled'),
      });
    }
  }

  return (
    <Box px="5" flex={1}>
      <VStack py="5" flex={1}>
        <Text fontSize="md" color="mark.800">
          {i18n.t('screen.siginCredentials.validateURL.websiteAddressPrompt')}
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
            {i18n.t('screen.siginCredentials.validateURL.continue')}
          </Button>
        </VStack>
        <VStack mt="5" flex={1} justifyContent="flex-end">
          <Center>
            <Text color="mark.800" fontSize="md" bold textAlign="center">
              {i18n.t('screen.sigin.wordpressAdmin')} {'>'} WPAFA {'>'}{' '}
              {i18n.t('screen.sigin.settings')} {'>'}{' '}
              {i18n.t('screen.profile.login')}
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
              <Text>
                {i18n.t(
                  'screen.siginCredentials.validateURL.verifyingWebsiteAddress'
                )}
              </Text>
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
