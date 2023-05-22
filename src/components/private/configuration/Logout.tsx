import { Box, Modal, Text, Button, Spinner } from 'native-base';
import React, { useState } from 'react';
import { ConfigurationItem } from './ConfigurationItem';

export function Logout() {
  const [showModal, setShowModal] = useState(false);
  const [load, setLoad] = useState(false);

  return (
    <>
      <ConfigurationItem
        label="Sair"
        iconName="power-off"
        onPress={() => setShowModal(true)}
      />
      <Modal
        isOpen={showModal}
        flex={1}
        closeOnOverlayClick
        animationPreset="slide"
      >
        {!load ? (
          <Modal.Content maxWidth="350">
            <Modal.Header color="mark.800">
              Você realemente deseja sair ?
            </Modal.Header>
            <Modal.Body>
              <Text color="mark.800">
                Ao fazer logout você deixara de receber as notificações, ficando
                sem saber quando um novo formulario foi preenchido. foi feito
              </Text>
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  variant="ghost"
                  colorScheme="blueGray"
                  onPress={() => {
                    setShowModal(false);
                  }}
                >
                  Cancelar
                </Button>
                <Button bg="mark.900">Logout</Button>
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
