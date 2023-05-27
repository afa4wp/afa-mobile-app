import {
  Box,
  Modal,
  Text,
  Pressable,
  Spinner,
  VStack,
  Divider,
} from 'native-base';
import React, { useContext, useState } from 'react';
import { ConfigurationItem } from './ConfigurationItem';
import { LanguageItem } from './LanguageItem';

export function Language() {
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <ConfigurationItem
        label="Language"
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
          <Modal.Header color="mark.800">Idioma atual</Modal.Header>
          <Modal.Body padding={0}>
            <Box>
              <LanguageItem
                label="Ingles"
                originalLabel="Inglish"
                onPress={() => {}}
              />
              <LanguageItem
                label="Portugus"
                originalLabel="Portugus"
                onPress={() => {}}
              />
              <LanguageItem
                label="Frenhch"
                originalLabel="Franceis"
                onPress={() => {}}
              />
              <LanguageItem
                label="Spaniol"
                originalLabel="Spanish"
                onPress={() => {}}
              />
            </Box>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
}
