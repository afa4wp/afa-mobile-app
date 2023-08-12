import { Box, Modal, Spinner, Text, useToast } from 'native-base';
import React, { useContext, useState } from 'react';
import { ConfigurationItem } from './ConfigurationItem';
import { LanguageItem } from './LanguageItem';
import LanguageContext from '../../../../context/LanguageContext';
import { TRANSLATIONS_OBJECT } from '../../../../constants/locales';
import * as deviceService from '../../../../services/device';
import { getOrCreateDeviceId } from '../../../../helpers/secureStore';

export function Language() {
  const [showModal, setShowModal] = useState(false);
  const { i18n, changeLanguage } = useContext(LanguageContext)!;
  const [load, setLoad] = useState(false);
  const toast = useToast();

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleLanguageChange = async (language: string) => {
    try {
      setLoad(true);
      const device_id = await getOrCreateDeviceId();
      await deviceService.language(device_id as string, language);
      await changeLanguage(language);
      handleCloseModal();
      setLoad(false);
    } catch (error) {
      toast.show({
        render: () => {
          return (
            <Box bg="mark.900" px="2" py="1" rounded="sm" mb={5}>
              <Text color="mark.700" fontSize="md">
                {i18n.t('screen.siginCredentials.credentials.errorOccurred')}
              </Text>
            </Box>
          );
        },
      });
    } finally {
      setLoad(false);
    }
  };

  return (
    <>
      <ConfigurationItem
        label={i18n.t('screen.configuration.language')}
        iconName="language"
        onPress={() => setShowModal(true)}
      />
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
            {i18n.t('screen.configuration.currentLanguage')}:{' '}
            {TRANSLATIONS_OBJECT[i18n.locale]}
          </Modal.Header>
          <Modal.Body padding={0}>
            {!load ? (
              <Box>
                <LanguageItem
                  label={i18n.t('languages.english')}
                  originalLabel="Inglish"
                  onPress={() => {
                    handleLanguageChange('en');
                  }}
                />
                <LanguageItem
                  label={i18n.t('languages.portuguese')}
                  originalLabel="Português"
                  onPress={() => {
                    handleLanguageChange('pt');
                  }}
                />
                <LanguageItem
                  label={i18n.t('languages.french')}
                  originalLabel="Français"
                  onPress={() => {
                    handleLanguageChange('fr');
                  }}
                />
                <LanguageItem
                  label={i18n.t('languages.spanish')}
                  originalLabel="Español"
                  onPress={() => {
                    handleLanguageChange('es');
                  }}
                />
                <LanguageItem
                  label={i18n.t('languages.italian')}
                  originalLabel="Italiano"
                  onPress={() => {
                    handleLanguageChange('it');
                  }}
                />
                <LanguageItem
                  label={i18n.t('languages.german')}
                  originalLabel="Deutsch"
                  onPress={() => {
                    handleLanguageChange('de');
                  }}
                />
              </Box>
            ) : (
              <Box flex={1} mt="5">
                <Spinner
                  accessibilityLabel="Loading"
                  size="lg"
                  color="mark.800"
                />
              </Box>
            )}
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
}
