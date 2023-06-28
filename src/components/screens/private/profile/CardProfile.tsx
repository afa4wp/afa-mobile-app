import {
  Box,
  Text,
  VStack,
  HStack,
  Avatar,
  IconButton,
  Modal,
  ScrollView,
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { User } from '../../../../@types/AuthTypes';
import { useState, useContext } from 'react';
import LanguageContext from '../../../../context/LanguageContext';

export function CardProfile({ user }: { user: User }) {
  const { i18n } = useContext(LanguageContext)!;
  const [showModal, setShowModal] = useState(false);

  const getFullName = () => {
    if (user.first_name && user.last_name)
      return user.first_name + ' ' + user.last_name;

    if (user.first_name) return user.first_name;

    return user.display_name;
  };

  const getFirstCharacter = () => {
    const displayName = user.display_name;
    if (displayName && displayName.length > 0) {
      return displayName[0];
    }
    return '';
  };

  function getFirstRole() {
    const roles = user.roles;
    const roleKeys = Object.keys(roles);
    if (roleKeys.length > 0) {
      return roles[roleKeys[0]];
    }
    return null;
  }

  return (
    <Box borderRadius="md">
      <VStack
        h="20"
        shadow="1"
        bg="mark.900"
        borderColor="mark.900"
        borderTopLeftRadius="md"
        borderTopRightRadius="md"
      ></VStack>
      <VStack
        h="20"
        shadow="1"
        bg="#fff"
        borderBottomLeftRadius="md"
        borderBottomRightRadius="md"
        px="5"
      >
        <HStack>
          <VStack mr="3">
            <Avatar
              source={{
                uri: user.avatar_url,
              }}
              size="lg"
              mt={-7}
            >
              {getFirstCharacter()}
            </Avatar>
          </VStack>
          <VStack flex={1}>
            <Text fontSize="sm" bold color="mark.800">
              {getFullName()}
            </Text>
            <HStack>
              <Text fontSize="sm" color="mark.800" mr="4">
                {getFirstRole()}
              </Text>

              <IconButton
                onPress={() => setShowModal(true)}
                size="xs"
                colorScheme="red"
                variant="ghost"
                _icon={{
                  as: Ionicons,
                  name: 'arrow-forward-outline',
                  color: 'mark.900',
                }}
              />
            </HStack>
          </VStack>
        </HStack>
      </VStack>
      <Modal
        animationPreset="slide"
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      >
        <Modal.Content>
          <Modal.Header color="mark.800">
            {i18n.t('screen.profile.roles')}
          </Modal.Header>
          <Modal.Body>
            <ScrollView flex={1} showsVerticalScrollIndicator={false}>
              <HStack flex={1} flexWrap="wrap">
                {Object.keys(user.roles).map((key, index) => (
                  <Text key={index} fontSize="sm" color="mark.800" m="2">
                    {user.roles[key]}
                  </Text>
                ))}
              </HStack>
            </ScrollView>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </Box>
  );
}
