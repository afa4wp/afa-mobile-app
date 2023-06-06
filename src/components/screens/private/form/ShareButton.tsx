import { Box, IconButton, Modal } from 'native-base';
import React, { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { ShareButtonItem } from './ShareButtonItem';

export function ShareButton() {
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <IconButton
        size="sm"
        colorScheme="red"
        variant="ghost"
        _icon={{
          as: FontAwesome,
          name: 'share-alt',
          color: 'mark.800',
        }}
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
            Formularios
          </Modal.Header>
          <Modal.Body padding={0}>
            <Box>
              <ShareButtonItem
                permaLink={{
                  page_name: 'teste',
                  page_link:
                    'http://localhost/wordpress/pagina-de-contato-do-formulario/',
                }}
              />
              <ShareButtonItem
                permaLink={{
                  page_name: 'teste',
                  page_link:
                    'http://localhost/wordpress/pagina-de-contato-do-formulario/',
                }}
              />
            </Box>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
}
