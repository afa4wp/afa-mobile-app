import { Box, Modal } from 'native-base';
import React, { useContext, useState } from 'react';
import { ConfigurationItem } from './ConfigurationItem';
import { LanguageItem } from './LanguageItem';
import LanguageContext from '../../../../context/LanguageContext';
import { TRANSLATIONS_OBJECT } from '../../../../constants/locales';
export function Language() {
  const [showModal, setShowModal] = useState(false);
  const { i18n, changeLanguage } = useContext(LanguageContext)!;

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleLanguageChange = async (language: string) => {
    await changeLanguage(language);
    handleCloseModal();
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
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
}
