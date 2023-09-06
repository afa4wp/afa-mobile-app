import {
  Pressable,
  Text,
  Icon,
  VStack,
  HStack,
  Modal,
  Box,
  InputGroup,
  InputLeftAddon,
  FormControl,
  Stack,
  Input,
  Button,
} from 'native-base';
import { Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import React, { useState, useContext } from 'react';
import { Platform } from 'react-native';
import { useFormik } from 'formik';
import LanguageContext from '../../../../../../../context/LanguageContext';
import * as yup from 'yup';

export function WhatsappButton({ label }: { label: string | null }) {
  const { i18n, changeLanguage } = useContext(LanguageContext)!;
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Function to check if WhatsApp can be opened
  const canOpenWhatsApp = async () => {
    const whatsappURL = 'whatsapp://send?text=Hello'; // Replace with your desired URL
    const supported = await Linking.canOpenURL(whatsappURL);
    return supported;
  };

  const validationSchema = yup.object().shape({
    phone: yup
      .string()
      .matches(
        /^[0-9]{7,16}$/,
        i18n.t('screen.entryMeta.phoneNumberValidation')
      )
      .required(i18n.t('screen.entryMeta.phoneNumberRequired')),
  });

  const formik = useFormik({
    initialValues: {
      phone: ('' + label).replace(/\D/g, ''),
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // Remove the plus sign from the phone number if it exists
      const phoneNumber = values.phone.replace('+', '');

      const isWhatsAppSupported = await canOpenWhatsApp();

      if (isWhatsAppSupported) {
        // Now you can use phoneNumber in your Linking.openURL function
        Linking.openURL(`whatsapp://send?phone=+${phoneNumber}`);
      } else {
        // WhatsApp is not supported, display an error message
        alert(i18n.t('screen.entryMeta.whatsappNotInstalled'));
      }
    },
  });
  return (
    <VStack>
      <Pressable
        _pressed={{
          backgroundColor: 'schemaPressed.900',
        }}
        onPress={() => setShowModal(true)}
      >
        <VStack>
          <HStack alignItems="center">
            <HStack py="3">
              <Icon
                as={FontAwesome}
                name="whatsapp"
                size="md"
                mr="3"
                color="mark.800"
              />
            </HStack>
            <HStack
              justifyContent="space-between"
              alignItems="center"
              flex={1}
              py="3"
            >
              <HStack>
                <Text fontSize="md" color="mark.800">
                  {label}
                </Text>
              </HStack>
            </HStack>
          </HStack>
        </VStack>
      </Pressable>
      <Modal
        isOpen={showModal}
        flex={1}
        onClose={handleCloseModal}
        animationPreset="slide"
        size="full"
        justifyContent="flex-end"
      >
        <Modal.Content height="100%" borderBottomRadius={0}>
          <Modal.Header color="mark.800" style={{ flexDirection: 'row' }}>
            {i18n.t('screen.entryMeta.openContactHeader')}
          </Modal.Header>
          <Modal.Body padding={0}>
            <Box flex={1} px={5}>
              <VStack py="5" flex={1}>
                <Text fontSize="md" color="mark.800">
                  {i18n.t('screen.entryMeta.phoneNumberFormatNote')}
                </Text>
              </VStack>
              <Stack mt="2">
                <FormControl
                  isInvalid={
                    formik.touched.phone && formik.errors.phone ? true : false
                  }
                >
                  <InputGroup w={{ base: '92%' }}>
                    <InputLeftAddon children={'+'} />
                    <Input
                      w={{ base: '100%' }}
                      placeholder={i18n.t(
                        'screen.entryMeta.phoneNumberPlaceholder'
                      )}
                      size="lg"
                      style={inputStyle}
                      onChangeText={formik.handleChange('phone')}
                      defaultValue={formik.initialValues.phone}
                    />
                  </InputGroup>
                  {formik.touched.phone && formik.errors.phone && (
                    <FormControl.ErrorMessage>
                      {formik.errors.phone}
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
                  leftIcon={<Icon as={FontAwesome} name="whatsapp" size="lg" />}
                >
                  {i18n.t('screen.entryMeta.whatsappButtonLabel')}
                </Button>
              </VStack>
            </Box>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </VStack>
  );
}

const inputStyle = {
  height: Platform.OS === 'ios' ? 45 : undefined, // Set height to 40 only for iOS
};
