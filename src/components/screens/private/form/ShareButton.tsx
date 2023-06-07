import { Box, IconButton, Modal, Heading } from 'native-base';
import React, { useState, useContext } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { ShareButtonItem } from './ShareButtonItem';
import { PermaLink } from '../../../../@types/FormType';
import { Share } from 'react-native';
import LanguageContext from '../../../../context/LanguageContext';
export function ShareButton({ perma_links }: { perma_links: PermaLink[] }) {
  const { i18n } = useContext(LanguageContext)!;
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const tryToShare = async () => {
    if (perma_links.length === 1) {
      await onShare(perma_links[0].page_link);
    } else {
      setShowModal(true);
    }
  };

  const onShare = async (message: string) => {
    try {
      const result = await Share.share({
        message: `${message}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
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
        onPress={() => tryToShare()}
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
            {i18n.t('screen.search.forms')}
          </Modal.Header>
          <Modal.Body padding={0}>
            <Box>
              {perma_links.length === 0 ? (
                <Heading color="mark.800" size="md" mt="4" px="5">
                  {i18n.t('screen.form.formNotInserted')}
                </Heading>
              ) : (
                perma_links.map((perma_link, index) => (
                  <ShareButtonItem
                    key={index}
                    permaLink={{
                      page_name: perma_link.page_name,
                      page_link: perma_link.page_link,
                    }}
                  />
                ))
              )}
            </Box>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
}
