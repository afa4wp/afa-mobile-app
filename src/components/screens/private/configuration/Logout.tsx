import { Box, Modal, Text, Button, Spinner } from 'native-base';
import React, { useContext, useState } from 'react';
import { ConfigurationItem } from './ConfigurationItem';
import AuthContext from '../../../../context/AuthContext';
import LanguageContext from '../../../../context/LanguageContext';

export function Logout() {
  const { i18n } = useContext(LanguageContext)!;
  const [showModal, setShowModal] = useState(false);
  const [load, setLoad] = useState(false);

  const { handleLogout } = useContext(AuthContext);

  const deleteExpoToken = async () => {
    setLoad(true);

    handleLogout();
    setLoad(false);
  };

  return (
    <>
      <ConfigurationItem
        label={i18n.t('screen.configuration.logout')}
        iconName="power-off"
        onPress={() => setShowModal(true)}
        hasBorder={false}
      />
      <Modal
        isOpen={showModal}
        flex={1}
        closeOnOverlayClick
        animationPreset="slide"
        onClose={() => setShowModal(false)}
      >
        {!load ? (
          <Modal.Content maxWidth="350">
            <Modal.Header color="mark.800">
              {i18n.t('screen.configuration.confirmation')}
            </Modal.Header>
            <Modal.Body>
              <Text color="mark.800">
                {i18n.t('screen.configuration.logoutConfirmation')}
              </Text>
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  variant="ghost"
                  colorScheme="trueGray"
                  onPress={() => {
                    setShowModal(false);
                  }}
                >
                  {i18n.t('screen.configuration.cancel')}
                </Button>
                <Button
                  bg="mark.900"
                  onPress={() => {
                    deleteExpoToken();
                  }}
                  minWidth={70}
                >
                  {i18n.t('screen.configuration.logout')}
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        ) : (
          <Spinner accessibilityLabel="Loading" size="lg" color="mark.900" />
        )}
      </Modal>
    </>
  );
}
